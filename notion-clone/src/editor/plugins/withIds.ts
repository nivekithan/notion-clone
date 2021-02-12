import { nanoid } from "nanoid";
import { Editor, Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withIds = (editor: ReactEditor) => {
  const { normalizeNode, insertBreak } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (Element.isElement(node) && !node.id) {
      Transforms.setNodes(editor, { id: nanoid() }, { at: path });
      return;
    }

    normalizeNode(entry);
  };
  editor.insertBreak = () => {
    insertBreak();
    Transforms.setNodes(editor, {id : nanoid()})
  }

  return editor
};
