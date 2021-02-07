import { Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { SlateEditor } from "../slateEditor";

export const withNumber = (editor: ReactEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (
      Element.isElement(node) &&
      node.type === "numbered-list" &&
      node._startId === node._id &&
      node.number !== 1
    ) {
      Transforms.setNodes(editor, { number: 1 }, { at: path });
      SlateEditor.synNumber(editor, node._startId + "");
      return;
    }

    normalizeNode(entry);
  };

  return editor
};
