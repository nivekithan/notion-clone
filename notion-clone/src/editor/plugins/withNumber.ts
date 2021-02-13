import { Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { SlateEditor } from "../utils/slateEditor";

export const withNumber = (editor: ReactEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (
      Element.isElement(node) &&
      node.type === "number-list" &&
      node.id === node.startId &&
      node.number !== 1
    ) {
      Transforms.setNodes(editor, { number: 1 }, { at: path });
      SlateEditor.synNumber(editor, node.startId as string);
      return;
    }

    normalizeNode(entry);
  };

  return editor;
};
