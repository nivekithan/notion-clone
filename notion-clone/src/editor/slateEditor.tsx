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
    options?: {
      endId?: string;
    }
  ) {
    // When the numbered-list whose _startId and _id are same gets removed
    // We need to update the second node _id as _startId for every single node
    // whose _startId is deleted one

    // Thats what this function does
    const updateStartId = () => {
      for (const [node, path] of this.getNodeWithProperties(
        editor,
        { _startId: startId },
        {
          match: (node) =>
            Element.isElement(node) && node.type === "numbered-list",
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
                node._startId === startId
              );
            },
          }
        );

        return newStartId;
      }
    };
    let startNodeEntry: [Element, Path] | null = null;

    // Find out the Node with _id as startId
    for (const [node, path] of Editor.nodes(editor, {
      at: [],
      match: (node) => Element.isElement(node) && node._id === startId,
    })) {
      startNodeEntry = [node as Element, path];
      break;
    }

    if (!startNodeEntry) {
      const newStartId = updateStartId();

      if (!newStartId) throw new Error("There is no new Start Id");

      this.synNumber(editor, newStartId);
      return;
    }

    const [startNode, startPath] = startNodeEntry;
    if (!(startNode.type === "numbered-list")) {
      const newStartId = updateStartId();
      if (!newStartId) throw new Error("There is no new Start Id");

      this.synNumber(editor, newStartId);

      return;
    }

    let currentNumber = startNode.number as number;

    for (const [siblingNode, path] of SlateEditor.siblings(editor, startPath)) {
      if (
        Editor.isEditor(siblingNode) ||
        !Element.isElement(siblingNode) ||
        (siblingNode.depth === startNode.depth &&
          (siblingNode.type !== "numbered-list" ||
            siblingNode._startId !== startNode._startId)) ||
        (siblingNode.depth as number) < (startNode.depth as number)
      ) {
        break;
      } else if ((siblingNode.depth as number) > (startNode.depth as number)) {
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

    const { _startId, _id } = start;

    if (Node.string(start) === "") {
      // If user typed no content on list and Entered "Enter" then
      // We will convert the list and convert it to type : "normal"

      Transforms.setNodes(editor, { type: "normal" });
      Transforms.unsetNodes(editor, ["_startId", "number", "_userDefined"]);

      // if the _startId and _id is same then we dont need to call
      // synNumber since there is no element which we need to convert
      if (!(_startId === _id))
        try {
          this.synNumber(editor, _startId);
        } catch (err) {}
    } else {
      editor.insertBreak();
      Transforms.setNodes(editor, { number: start.number + 1 });
      this.synNumber(editor, _startId);
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

    const copyPath = [...path];
    const location = copyPath[copyPath.length - 1]; // Location becuase cant come up with better name
    const isFirst = location === 0;

    // console.log({isFirst})
    if (!isFirst) {
      const immediateAbovePath = copyPath.slice(0, copyPath.length - 1);
      immediateAbovePath.push(location - 1);

      const immediateAboveNode = Node.get(editor, immediateAbovePath);
      // console.log({ immediateAboveNode });
      if (
        immediateAboveNode.type === "numbered-list" &&
        immediateAboveNode.depth === node.depth
      ) {
        // console.log("I am inside");
        const { _startId, _userDefined } = immediateAboveNode;

        if (typeof _startId !== "string" || typeof _userDefined !== "boolean")
          return;

        Transforms.setNodes(
          editor,
          { _startId: _startId, _userDefined: _userDefined },
          { at: path }
        );
        SlateEditor.synNumber(editor, _startId);
      } else {
        const { _id, _userDefined } = node;

        if (typeof _id !== "string" || typeof _userDefined !== "boolean")
          return;

        Transforms.setNodes(editor, { _startId: _id, number: 1 }, { at: path });
        SlateEditor.synNumber(editor, _id);
      }
    } else {
      const { _id, _userDefined } = node;
      if (typeof _id !== "string" || typeof _userDefined !== "boolean") return;

      Transforms.setNodes(editor, { number: 1, _startId: _id }, { at: path });
      SlateEditor.synNumber(editor, _id);
    }
  },
};
