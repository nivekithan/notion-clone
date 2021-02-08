import {
  Editor,
  Element,
  Range,
  Node,
  Path,
  Transforms,
  NodeEntry,
  Location,
} from "slate";
import { ReactEditor } from "slate-react";

import { isSubsetOf } from "is-subset-of";
import { ID_TO_PATH } from "./editor";
import { ReactFragment } from "react";

export const SlateEditor = {
  ...Editor,

  // Get the start and end element from given range
  getEdgeElement(editor: ReactEditor, range: Range): [Element, Element] {
    const [start, end] = [
      ...Range.edges(range).map((point) => {
        return Node.parent(editor, point.path);
      }),
    ];

    return [start, end];
  },
  // Compares two element and returns if both element are same element
  isSameElement(editor: ReactEditor, elementOne: Element, elementTwo: Element) {
    if (elementOne._id === elementTwo._id) {
      return true;
    }

    return false;
  },

  /*
    Finds if the given the path would lead to node which is first child
  */

  isFirst(editor: ReactEditor, path: Path) {
    /*
      Check if the given path is root
    */

    if (path.length === 0) {
      return false;
    }

    const location = path.pop(); // Location because unable to come up with better name

    if (location === 0) return true;

    return false;
  },

  /*
    Get an elements path from the id
  */
  getPathById(editor: ReactEditor, id: string) {
    const path = ID_TO_PATH.get(id);

    if (path) {
      return path;
    } else {
      throw new Error("There is no path with ID: " + id);
    }
  },

  getNodeById(editor: ReactEditor, id: string): NodeEntry {
    const path = this.getPathById(editor, id);

    if (path) {
      try {
        const node = Node.get(editor, path);
        return [node, path];
      } catch (err) {
        throw new Error("There is no element with the id: " + id);
      }
    } else {
      throw new Error("There is no path with id: " + id);
    }
  },

  getDepthById(editor: ReactEditor, id: string): number {
    const [node] = this.getNodeById(editor, id);

    if (typeof node.depth === "number") {
      return node.depth;
    } else {
      throw new Error(
        "The typeof depth is not number, it is: " + typeof node.depth
      );
    }
  },

  *siblings(
    editor: ReactEditor,
    path: Path,
    reverse: boolean = false
  ): Generator<[Node, Path]> {
    // Figure out if the path is root
    if (path.length === 0) return;
    if (!reverse) {
      // Creating a newPath since calling Node.elements with option {from : path}
      // Will return the node with that path also
      // We need node after that path.
      const newPath = [...path];
      const location = newPath.pop(); // Unable to come up with good name thats why location

      if (!location && location !== 0) return; // Since Number(0) will evalulate to false we have to make sure thats not the case
      newPath.push(location + 1);

      try {
        for (const entry of Node.elements(editor, { from: newPath })) {
          yield entry;
        }
      } catch (err) {}
    } else if (reverse) {
      // Find out if the element is first

      // Creating a newPath since calling Node.elements with option {fron : path}
      // will return the node with path also
      // But we need before that
      const newPath = [...path];
      const location = newPath.pop();

      if (!location && location !== 0) return;
      newPath.push(location - 1);

      try {
        for (const entry of Node.elements(editor, {
          from: newPath,
          reverse: true,
        })) {
          yield entry;
        }
      } catch (err) {}
    }
  },

  *getNodeWithProperties(
    editor: ReactEditor,
    properties: Partial<Element>,
    options: {
      no?: number;
      at?: Location;
      match?: (node: Node) => boolean;
    } = {}
  ) {
    const { no = 1, at = [] } = options;
    let currentNumber = 0;
    for (const entry of Editor.nodes(editor, { ...options, at })) {
      if (currentNumber >= no) break;

      const [node, path] = entry;
      const isSubset = isSubsetOf(properties, node);

      if (isSubset) {
        currentNumber++;
        yield entry;
      } else {
        continue;
      }
    }
  },

  /*
    The following function will return the immediate element above the given path. If either the path is root or
    the path refers to the element which is first child of parent then the function will throw error
  */

  getImmediateAbove(editor: ReactEditor, path: Path): NodeEntry {
    const copyPath = [...path];

    /*
      Check if the path is root
    */

    if (copyPath.length === 0) {
      throw new Error("The given path is root i.e []");
    }
    const location = copyPath.pop(); // Location because unable to come up with better name
    /*
      Check if the given path refers to the element which is first child of the parent
    */

    if (location === 0) {
      throw new Error(
        "The given path refers to element which is the first child of the parent: The given path is " +
          JSON.stringify(path)
      );
    }

    /*
      Create a the path which will be immediate above of the given path
    */

    const newPath = [...copyPath, (location as number) - 1];
    const aboveNode = Node.get(editor, newPath);

    return [aboveNode, newPath];
  },

  replace(
    editor: ReactEditor,
    properties: Partial<Node>,
    options: {
      match?: (node: Node) => boolean;
      at?: Location;
    } = {}
  ) {
    const { at = [] } = options;

    for (const entry of Editor.nodes(editor, { ...options, at })) {
      const [node, path] = entry;
      Transforms.setNodes(editor, properties, { at: path });
    }
  },

  synNumber(
    editor: ReactEditor,
    startId: string,
    depth: number,
    options: {
      endId?: string;
    } = {}
  ) {
    // When the numbered-list whose _startId and _id are same gets removed
    // We need to update the second node _id as _startId for every single node
    // whose _startId is deleted one

    // Thats what this function does

    let startNodeEntry: NodeEntry | null = null;

    try {
      startNodeEntry = this.getNodeById(editor, startId);
    } catch (err) {
      const newStartId = this.updateStartId(editor, startId, depth);

      if (!newStartId) return;

      const newDepth = this.getDepthById(editor, newStartId);

      this.synNumber(editor, newStartId, newDepth);
      return;
    }

    const [startNode, startPath] = startNodeEntry;
    if (!(startNode.type === "numbered-list") || startNode.depth !== depth) {
      const newStartId = this.updateStartId(editor, startId, depth);
      if (!newStartId) return;

      const newDepth = this.getDepthById(editor, newStartId);
      this.synNumber(editor, newStartId, newDepth);

      return;
    }

    let currentNumber = startNode.number as number;

    for (const [siblingNode, path] of SlateEditor.siblings(editor, startPath)) {
      /*
        Condition below return true when
            
          * The siblingNode is Editor
          * The siblingNode is not Element
          * The depth of sibling Node and startNode is same but the type of sibiing node is not "numbered-list" even if it is "numbered-list" then
          * The _startId of Sibling Node is not same as _startId of Sibling Node meaning both are numbered list but belonging to different groups
          * If the depth of sibling node is less than depth of startNode. This does not return true when the sibling node is of type === "normal" 
            and the text it contains are only whitespace
        
        When these condition returns true we will stop exceuting the synfunction
      */

      if (
        Editor.isEditor(siblingNode) ||
        !Element.isElement(siblingNode) ||
        (siblingNode.depth === startNode.depth &&
          (siblingNode.type !== "numbered-list" ||
            siblingNode._startId !== startNode._startId) &&
          !(
            siblingNode.type === "normal" &&
            Node.string(siblingNode).trim() === ""
          )) ||
        ((siblingNode.depth as number) < (startNode.depth as number) &&
          !(
            siblingNode.type === "normal" &&
            Node.string(siblingNode).trim() === ""
          ))
      ) {
        break;
      } else if (
        /*
        Conditon below return true when

        * When the siblingNode depth is higher than startNode depth
        * When the sibling node type === "normal" and it contains only whitespaces
        
        When the function retuns true the synNumber function will ignore it and move on to next siblingNode 
      */
        (siblingNode.depth as number) > (startNode.depth as number) ||
        (siblingNode.type === "normal" &&
          Node.string(siblingNode).trim() === "")
      ) {
        continue;
      } else {
        Transforms.setNodes(
          editor,
          { number: currentNumber + 1 },
          { at: path }
        );
        currentNumber++;
      }
    }
  },

  updateStartId(editor: ReactEditor, startId: string, depth: number) {
    for (const [node] of this.getNodeWithProperties(
      editor,
      { _startId: startId },
      {
        match: (node) =>
          Element.isElement(node) &&
          node.type === "numbered-list" &&
          node.depth === depth,
      }
    )) {
      const newStartId = node._id as string;

      this.replace(
        editor,
        { _startId: newStartId },
        {
          match: (node) => {
            return (
              Element.isElement(node) &&
              node.type === "numbered-list" &&
              !!node._startId &&
              node._startId === startId &&
              node.depth === depth
            );
          },
        }
      );

      return newStartId;
    }
  },
  // This function should called only
  // when the starting node of
  // selected text is of
  // type === "numbered-list".
  //
  // Else function wil throw error
  insertBreakNumber(editor: ReactEditor) {
    if (!editor.selection) {
      return;
    }

    const [start] = SlateEditor.getEdgeElement(editor, editor.selection);

    if (!(typeof start.number === "number"))
      throw new Error(
        'function is called when selected Text does not start from type === "numbered-list"'
      );

    if (!(typeof start._startId === "string"))
      throw new Error("There is no startID");

    const { _startId, _id, depth } = start;

    if (Node.string(start) === "") {
      // If user typed no content on list and Entered "Enter" then
      // We will convert the list and convert it to type : "normal"

      Transforms.setNodes(editor, { type: "normal" });
      Transforms.unsetNodes(editor, ["_startId", "number", "_userDefined"]);
      // console.log({_startId})
      this.synNumber(editor, _startId, depth as number);
    } else {
      editor.insertBreak();
      Transforms.setNodes(editor, { number: start.number + 1 });
      this.synNumber(editor, _startId, depth as number);
    }
  },

  /*
  This is function will change the depth to depth + 1
  */

  indent(editor: ReactEditor) {
    const { selection } = editor;

    if (!selection) return;

    const [start, end] = Range.edges(selection).map((point) => point.path);

    for (let [node, path] of Node.elements(editor, { from: start, to: end })) {
      const currentDepth = node.depth;
      if (typeof currentDepth !== "number") continue;

      Transforms.setNodes(editor, { depth: currentDepth + 1 }, { at: path });
      if (node.type === "numbered-list") {
        SlateEditor.indentNumber(editor, [Node.get(editor, path), path]);
      }
    }
  },

  /*
 Function which will change the depth to depth + 1 
 
 if there is no immedidate numbered-list with same depth
 above the indented element then

 It will change the number to one, _startId to its own id 

 if there is immedidate numbered-list above the indented element then

 it will change the _startId to above elements one and call synNumber

 */

  indentNumber(editor: ReactEditor, nodeEntry: NodeEntry) {
    const [node, path] = nodeEntry;

    if (this.isFirst(editor, path)) {
     const [immediateAboveNode, immediateAbovePath] = this.getImmediateAbove(editor, path)

      if (
        immediateAboveNode.type === "numbered-list" &&
        immediateAboveNode.depth === node.depth
      ) {
        const { _startId, depth } = immediateAboveNode;

        if (
          typeof _startId !== "string" ||
          typeof depth !== "number"
        )
          return;

        Transforms.setNodes(
          editor,
          { _startId: _startId},
          { at: path }
        );
        this.synNumber(editor, _startId, depth);
        this.synNumber(editor, node._startId as string, node.depth as number )
      } else {
        const { _id, depth } = immediateAboveNode;

        if (
          typeof _id !== "string" ||
          typeof depth !== "number"
        )
          return;

        Transforms.setNodes(editor, { _startId: _id, number: 1 }, { at: path });
        this.synNumber(editor, _id, depth);
      }
    } else {
      const { _id, _userDefined, depth } = node;
      if (
        typeof _id !== "string" ||
        typeof _userDefined !== "boolean" ||
        typeof depth !== "number"
      )
        return;

      Transforms.setNodes(editor, { number: 1, _startId: _id }, { at: path });
      this.synNumber(editor, _id, depth);
    }
  },
};
