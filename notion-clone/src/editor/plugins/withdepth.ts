import { ReactEditor } from "slate-react";
import { Element, Transforms } from "slate";

export const withDepth = (editor: ReactEditor): ReactEditor => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (Element.isElement(node) && !node.depth && node.depth !== 0) {
      Transforms.setNodes(editor, { depth: 0 }, { at: path });
    }
    normalizeNode(entry);
  };

  return editor;
};
