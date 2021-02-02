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

  *siblings(editor: ReactEditor, path: Path): Generator<[Node, Path]> {
    console.log(path);
    // Figure out if the path is root
    if (path.length === 0) return;
    console.log(path);

    // Find out if the element is last
    const [lastNode] = Node.last(
      editor,
      ReactEditor.findPath(editor, Node.parent(editor, path))
    );
    const isLast = Node.matches(lastNode, Node.get(editor, path));
    if (isLast) return;

    // Creating a newPath since callling Node.elements with option {from : path}
    // Will return the node with that path also
    // We need node after that path.
    const newPath = [...path];
    const location = newPath.pop(); // Unable to come up with good name thats why location

    if (!location && location !== 0) return;
    newPath.push(location + 1);

    for (const entry of Node.elements(editor, { from: newPath })) {
      yield entry;
    }
  },

  synNumber(
    editor: ReactEditor,
    start: Path,
    userDefined: boolean,
    end?: Path
  ) {
    const node = Node.get(editor, start);
    if (!(node.type === "numbered-list"))
      throw new Error(
        "The given path does not return a node which is of type numbered-list \n the given path is" +
          JSON.stringify(start)
      );

    let currentNumber = node.number as number;

    for (const [siblingNode, path] of SlateEditor.siblings(editor, start)) {
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

    const [start, end] = SlateEditor.getEdgeElement(editor, editor.selection);
    const isSame = SlateEditor.isSameElement(editor, start, end);
    const isUserDefined = !!start._userDefined;

    if (!(typeof start.number === "number"))
      throw new Error(
        'function is called when selected Text does not start from type === "numbered-list"'
      );

    Transforms.splitNodes(editor, { always: true });
    Transforms.setNodes(editor, { number: start.number + 1 });
    this.synNumber(editor, ReactEditor.findPath(editor, start), isUserDefined);
  },
};
