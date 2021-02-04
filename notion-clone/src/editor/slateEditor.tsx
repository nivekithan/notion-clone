import { Editor, Element, Range, Node, Path, Transforms } from "slate";
import { ReactEditor } from "slate-react";

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

  synNumber(
    editor: ReactEditor,
    startId: string,
    userDefined: boolean,
    endId?: string
  ) {
    let startNodeEntry: [Element, Path] | null = null;

    // Find out the Node with _id as startId
    for (const [node, path] of Node.elements(editor)) {
      if (node._id === startId) {
        startNodeEntry = [node, path];
        break;
      }
    }

    if (!startNodeEntry)
      throw new Error("There is no element with _id " + startId);

    const [startNode, startPath] = startNodeEntry;

    if (!(startNode.type === "numbered-list"))
      throw new Error(
        "The given path does not return a node which is of type numbered-list \n the given path is" +
          JSON.stringify(startPath)
      );

    let currentNumber = startNode.number as number;

    for (const [siblingNode, path] of SlateEditor.siblings(editor, startPath)) {
      if (
        Editor.isEditor(siblingNode) ||
        !Element.isElement(siblingNode) ||
        !(siblingNode.type === "numbered-list") ||
        !(siblingNode._userDefined === userDefined)
      ) {
        break;
      }

      Transforms.setNodes(editor, { number: currentNumber + 1 }, { at: path });
      currentNumber++;
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

    const isUserDefined = !!start._userDefined;
    const { _startId } = start;



    if (Node.string(start) === "") {

      // If user typed no content on list and Entered "Enter" then 
      // We will convert the list and convert it to type : "normal"

      Transforms.setNodes(editor, { type: "normal" });
      Transforms.unsetNodes(editor, ["_startId", "number"]);
      this.synNumber(editor, _startId, isUserDefined);
    } else {
      editor.insertBreak();
      Transforms.setNodes(editor, { number: start.number + 1 });
      this.synNumber(editor, _startId, isUserDefined);
    }
  },
};
