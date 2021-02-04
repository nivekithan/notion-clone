import { Editor, Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { nanoid } from "nanoid";

export const withIds = (editor: ReactEditor) => {
  const { normalizeNode, insertBreak } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (!Editor.isEditor(node) && Element.isElement(node) && !node._id) {
      Transforms.setNodes(editor, { _id: nanoid() }, { at: path });
      return;
    }

    normalizeNode(entry);
  };

  editor.insertBreak = () => {
    Transforms.splitNodes(editor, { always: true });
    Transforms.unsetNodes(editor, "_id");
  };

  return editor;
};
