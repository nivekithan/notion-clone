import { Editor, Element, Node, Path, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";

const INSERT_PARAGRAPH_ON_BREAK = [
  "heading-1",
  "heading-2",
  "heading-3",
  "title",
];

export const withCore = (e: ReactEditor) => {
  const { insertBreak } = e;

  e.insertBreak = () => {
    const selection = e.selection;

    if (!selection) {
      return null;
    }

    if (Range.isCollapsed(selection)) {
      const startPath = selection.anchor.path;
      const blockElement = getBlockParent(e, startPath);

      if (INSERT_PARAGRAPH_ON_BREAK.includes(blockElement.type as string)) {
        Transforms.splitNodes(e, { always: true });
        Transforms.setNodes(e, { type: "paragraph" });
      } else {
        insertBreak();
      }
    }
  };

  return e;
};

const getBlockParent = (e: ReactEditor, path: Path): Element => {
  const newPath = [...path];

  if (!path.length) {
    throw new Error("empty array is not acceptable path");
  }

  const element = Node.get(e, newPath);

  if (Editor.isBlock(e, element)) {
    return element as Element;
  } else {
    newPath.pop();
    return getBlockParent(e, newPath);
  }
};
