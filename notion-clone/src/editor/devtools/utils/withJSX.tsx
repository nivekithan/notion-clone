import { nanoid } from "nanoid";
import { Editor, Transforms } from "slate";
import { DevEditor } from "./node";

export function withJSX<T extends Editor>(editor: T): T {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;


    if (
      !DevEditor.isEditor(node) &&
      (!node.devtools_depth || node.devtools_depth !== path.length - 1)
    ) {
      Transforms.setNodes(
        editor,
        { devtools_depth: path.length - 1 },
        { at: path }
      );
    }

    if (!DevEditor.isEditor(node) && !node.devtools_id) {
      Transforms.setNodes(editor, { devtools_id: nanoid() }, { at: path });
    }

    normalizeNode(entry);
  };

  return editor;
}
