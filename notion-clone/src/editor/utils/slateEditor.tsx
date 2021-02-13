import { nanoid } from "nanoid";
import {
  Editor,
  Node,
  NodeEntry,
  Path,
  Transforms,
  Element,
  Range,
  Text,
} from "slate";
import { ReactEditor } from "slate-react";
import { shallowEqualArrays } from "shallow-equal";

export const SlateEditor = {
  startElement(editor: ReactEditor, at: Range): NodeEntry<Element> {
    /*
    We need to slice so that we would get the parent node which desiered outcome
    if we didnt slice then we will get text node 
    
     */
    const startPath = Editor.start(editor, at).path.slice(0, -1);

    const startNode = Node.get(editor, startPath);

    return [startNode as Element, startPath];
  },

  endElement(editor: ReactEditor, at: Range): NodeEntry<Element> {
    /*
      We need to slice so that we would get the parent node which is desiered outcome
      if we didint slice then we will get text node
    */

    const endPath = Editor.end(editor, at).path.slice(0, -1);

    const endNode = Node.get(editor, endPath);

    return [endNode as Element, endPath];
  },

  edgeElement(
    editor: ReactEditor,
    at: Range
  ): [NodeEntry<Element>, NodeEntry<Element>] {
    const startNodeEntry = this.startElement(editor, at);
    const endNodeEntry = this.endElement(editor, at);

    return [startNodeEntry, endNodeEntry];
  },

  isFirstChild(editor: ReactEditor, path: Path): boolean {
    /*
       Checking if the path is root
     */

    if (path.length === 0) return false;

    const location = path[path.length - 1]; // Location because unable to come up with better name

    if (location === 0) return true;

    return false;
  },

  isLastChild(editor: ReactEditor, path: Path): boolean {
    /*
      Checking if the path is root
    */

    if (path.length === 0) return false;

    const location = path[path.length - 1]; // Location because unable to come up with better name

    if (Editor.parent(editor, path)[0].children.length - 1 === location)
      return true;

    return false;
  },

  getImmediateAboveElement(
    editor: ReactEditor,
    entry: NodeEntry
  ): NodeEntry<Element> {
    const [node, path] = entry;
    /*
        Checking if the path is root
      */

    if (path.length === 0) {
      throw new Error("Given path refers to root");
    }

    let elementPath: Path = [];

    if (Element.isElement(node)) {
      elementPath = path;
    } else if (Text.isText(node)) {
      elementPath = path.slice(0, -1); // Getting the parent of Text node
    } else {
      throw new Error("The given node should be either element, text");
    }

    /*
            Checking if the given path leads to element which is first child
          */

    if (this.isFirstChild(editor, elementPath))
      throw new Error("The given path leads to element which is first child");

    const location = elementPath[elementPath.length - 1]; // Locaiton becase unable to come up with better name

    const newPath = elementPath.slice(0, -1);
    newPath.push(location - 1);

    return [Node.get(editor, newPath) as Element, newPath];
  },

  getImmediateBelowElement(
    editor: ReactEditor,
    entry: NodeEntry
  ): NodeEntry<Element> {
    const [node, path] = entry;

    /*
          Checking if the given path is root
        */

    if (path.length === 0) throw new Error("The given path is root");

    let elementPath: Path = [];

    if (Element.isElement(node)) {
      elementPath = path;
    } else if (Text.isText(node)) {
      elementPath = path.slice(0, -1); // To get the parent node of the text Node
    }

    const location = elementPath[elementPath.length - 1]; // Location because unable to come up with better name

    /*
          Checking if the element path refers to lastChild
        */

    if (this.isLastChild(editor, elementPath))
      throw new Error("THe given path refers to last child");

    const newPath = elementPath.slice(0, -1);
    newPath.push(location + 1);

    return [Node.get(editor, newPath) as Element, newPath];
  },
  replace(
    editor: ReactEditor,
    propterties: Partial<Node>,
    options: { match?: (n: Node) => boolean; reverse?: boolean } = {}
  ): void {
    for (const [, path] of Editor.nodes(editor, { ...options, at: [] })) {
      Transforms.setNodes(editor, propterties, { at: path });
    }
  },

  findPathById(editor: ReactEditor, id: string): Path {
    for (const [node, path] of Editor.nodes(editor, { at: [] })) {
      if (node.id === id) return path;
    }

    throw new Error("There is no path with the id: " + id);
  },

  findElementEntryById(editor: ReactEditor, id: string): [Element, Path] {
    const path = this.findPathById(editor, id);

    const node = Node.get(editor, path);

    if (Element.isElement(node)) {
      return [node, path];
    } else {
      throw new Error(`The node returned by id: ${id} is not an element1`);
    }
  },

  updateStartId(
    editor: ReactEditor,
    startId: string,
    depth: number,
    options: { match?: (n: Node) => boolean } = {}
  ): string | void {
    const {
      match = (node: Node) => {
        if (node.startId === startId && node.depth === depth) {
          return true;
        } else {
          return false;
        }
      },
    } = options;

    for (const [node, path] of Editor.nodes(editor, { match, at: [] })) {
      const { startId, id } = node;

      if (typeof id !== "string") {
        Transforms.setNodes(editor, { id: nanoid() }, { at: path });
        return this.updateStartId(editor, startId as string, depth, { match });
      }

      Transforms.setNodes(editor, { startId: id }, { at: path });
      this.replace(editor, { startId: id }, { match: match });
      return id;
    }
  },

  *sibilings(
    editor: ReactEditor,
    at: Path,
    options: {
      reverse?: boolean;
      match?: (n: Node) => boolean;
      voids?: boolean;
    } = {}
  ) {
    const newMatch = (node: Node): boolean => {
      const path = this.findPathById(editor, node.id as string);

      /*
        If the path of node is not of same length of given `at : Path` length then the node is not sibling. 
        if the path of parent of node is not same as given `at : Path` length then the node is not asibling
      */
      if (
        path.length !== at.length ||
        !shallowEqualArrays(path.slice(0, -1), at.slice(0, -1)) ||
        path[path.length - 1] < at[path.length - 1]
      ) {
        return false;
      } else {
        /*
          If the there is no match paramter then return true. 
          If there is match paramter then return the value returned by that function
        */
        const { match } = options;

        if (!match) {
          return true;
        } else {
          return match(node);
        }
      }
    };

    for (const entry of Editor.nodes(editor, {
      ...options,
      match: newMatch,
      at: [],
    })) {
      yield entry;
    }
  },

  synNumber(editor: ReactEditor, startId: string, depth: number): void {
    let startIdElementEntry: [Element, Path] | null;

    try {
      startIdElementEntry = this.findElementEntryById(editor, startId);
    } catch (err) {
      const newStartId = this.updateStartId(editor, startId, depth);
      if (!newStartId) {
        /*
             If there is no element with the startId as given startId only then there will be no newStartId
             this is the case if the user deleted last and only number-list whose startId is given startId.

             In that case there will be no number-list we need syn so we can just stop exceutation of function
           */
        return;
      }
      return this.synNumber(editor, newStartId, depth);
    }

    const [startIdNode, startIdPath] = startIdElementEntry;
    let currentNumber = 1;

    for (const [siblingNode, siblingPath] of this.sibilings(
      editor,
      startIdPath
    )) {
      /*
          Condition when to break the this cycle
                * If the the sibling node is not  type of number-list - exception case (1)(2)
                * if the sibling node is is of number-list but its startId is different from given startId - exception case (2)
                * if the sibling node depth is higher than the depth of given depth with one excepth case (1) (2)

            Exception cases
                * If sibling node is of type normal and its content is empty or whitespaces then we should not break the cycle
                * If sibling node depth is less than given depth then we should always not break cycle
        */
      if (
        (siblingNode.type !== "number-list" ||
          siblingNode.startId !== startId ||
          (siblingNode.depth as number) > depth) &&
        !((
          siblingNode.type === "normal" &&
          Node.string(siblingNode).trim() === ""
        ) || ((siblingNode.depth as number) > depth))
      ) {
        break;
      } else if (
        /*
            Condition when to ignore the sibling the node and go to next
                    * If the sibling node is of type normal and its content is empty or whitespaces
                    * If the sibling node depth is less than the given depth
          */

        (siblingNode.type === "normal" &&
          Node.string(siblingNode).trim() === "") ||
        (siblingNode.depth as number) > depth
      ) {
        continue;
      } else {
        Transforms.setNodes(
          editor,
          { number: currentNumber },
          { at: siblingPath }
        );
        currentNumber++;
      }
    }
  },

  insertBreakNumber(editor: ReactEditor) {
    const { selection } = editor;
    if (!selection) return;
    Editor.insertBreak(editor);

    const [startNode, startPath] = this.startElement(editor, selection);

    const { startId, depth } = startNode;

    if (typeof startId === "string" && typeof depth === "number") {
      this.synNumber(editor, startId, depth);
    }
  },

  depthIncrease(editor: ReactEditor) {
    const { selection } = editor;

    if (!selection) return;

    const [[, startPath], [, endPath]] = this.edgeElement(editor, selection);

    for (const [node, path] of Node.nodes(editor, {
      from: startPath,
      to: endPath,
    })) {
      /*
        We will only increase the depth for Element Node not Text node 
      */

      if (Element.isElement(node)) {
        if (node.type === "number-list")
          return this.depthIncreaseNumber(editor, [node, path]);

        Transforms.setNodes(
          editor,
          { depth: (node.depth as number) + 1 },
          { at: path }
        );
      }
    }
  },

  depthIncreaseNumber(editor: ReactEditor, entry: NodeEntry<Element>) {
    const [node, path] = entry;

    const { depth, startId, id } = node;

    /*
    The function will syn with bellow element
    */
    const synWithBellowElement = () => {
      const [
        immediateBellowElement,
        immediateBellowPath,
      ] = this.getImmediateBelowElement(editor, entry);

      if (
        (immediateBellowElement.depth as number) === (depth as number) + 1 &&
        immediateBellowElement.type === "number-list"
      ) {
        const { startId: immediateBellowStartId } = immediateBellowElement;

        Transforms.setNodes(
          editor,
          { startId: id, depth: (depth as number) + 1 },
          { at: path }
        );

        /*
          We will replace every element with startId as immediateBellowStartid to element with startId as id
        */
        const match = (n: Node): boolean => {
          if (
            n.type === "number-list" &&
            n.startId === immediateBellowStartId &&
            n.depth === (depth as number) + 1
          ) {
            return true;
          } else {
            return false;
          }
        };
        this.replace(
          editor,
          { startId: id },
          {
            match: match,
          }
        );
        this.synNumber(editor, id as string, (depth as number) + 1);
        this.synNumber(editor, startId as string, depth as number);
      } else {
        Transforms.setNodes(
          editor,
          { startId: id, depth: (depth as number) + 1 },
          { at: path }
        );
        this.synNumber(editor, startId as string, depth as number);
        this.synNumber(editor, id as string, (depth as number) + 1);
      }
    };

    /*
      The function will syn with above element
    */

    const synWithAboveElement = () => {
      const [
        immediateAboveNode,
        immediateAbovePath,
      ] = this.getImmediateAboveElement(editor, entry);

      if (
        immediateAboveNode.type === "number-list" &&
        (immediateAboveNode.depth as number) === (depth as number) + 1
      ) {
        const { startId: immediateAboveStartId } = immediateAboveNode;

        Transforms.setNodes(
          editor,
          { startId: immediateAboveStartId, depth: (depth as number) + 1 },
          { at: path }
        );
        this.synNumber(editor, startId as string, depth as number);
        this.synNumber(
          editor,
          immediateAboveStartId as string,
          (depth as number) + 1
        );
      } else {
        Transforms.setNodes(
          editor,
          { startId: id, depth: (depth as number) + 1 },
          { at: path }
        );
        this.synNumber(editor, startId as string, depth as number);
        this.synNumber(editor, id as string, (depth as number) + 1);
      }
    };

    /*
      This function favours syncing with above element considering that above element is

            * Of type number-list and has depth as given depth  + 1
      if thats not case then the function will call synWithBellowElement
    */

    const synWithElement = () => {
      const [immediateAboveNode] = this.getImmediateAboveElement(editor, entry);
      if (
        immediateAboveNode.type === "number-list" &&
        immediateAboveNode.depth === (depth as number) + 1
      ) {
        synWithAboveElement();
      } else {
        synWithBellowElement();
      }
    };

    if (this.isFirstChild(editor, path)) {
      synWithBellowElement();
    } else if (this.isLastChild(editor, path)) {
      synWithAboveElement();
    } else {
      synWithElement();
    }
  },
};
