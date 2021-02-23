import { nanoid } from "nanoid";
import { Editor, Element, Node, Text, Transforms } from "slate";
import { DevEditor } from "./slate";

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

    if (
      (!DevEditor.isEditor(node) && !node.devtools_index) ||
      node.devtools_id !== path[path.length - 1]
    ) {
      Transforms.setNodes(
        editor,
        { devtools_index: path[path.length - 1] },
        { at: path }
      );
    }

    normalizeNode(entry);
  };

  return editor;
}

const findLastIndex = (node: Element | Text): number => {
  if (Element.isElement(node)) {
    return findLastIndex(node.children[node.children.length - 1]);
  } else if (Text.isText(node)) {
    return node.devtools_index as number;
  } else {
    throw new Error("FindLastIndex will only accept either Element or Text");
  }
};
