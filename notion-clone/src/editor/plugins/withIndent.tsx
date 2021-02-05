import { Editor, Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withIndent = (editor: ReactEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      !node.depth &&
      node.depth !== 0
    ) {
      // We have to check for zero since 0 js consider 0 as false

      Transforms.setNodes(editor, { depth: 0 }, { at: path });
    }

    normalizeNode(entry);
  };

  return editor
};
