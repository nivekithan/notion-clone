import { Editor, Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withMath = (editor: ReactEditor) => {
  const { isVoid, isInline, normalizeNode } = editor;

  editor.isVoid = (n) => {
    if (n.type === "inline-math" || n.type === "block-math") {
      return true;
    }

    return isVoid(n);
  };

  editor.isInline = (n) => {
    if (n.type === "inline-math") {
      return true;
    }

    return isInline(n);
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (
      Element.isElement(node) &&
      node.type === "inline-math" &&
      Editor.isEditor(Node.parent(editor, path))
    ) {
      Transforms.wrapNodes(
        editor,
        { type: "normal", children: [] },
        {
          at: path,
        }
      );
      return;
    }

    return normalizeNode(entry);
  };

  return editor;
};
