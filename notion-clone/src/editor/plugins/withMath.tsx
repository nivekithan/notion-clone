import { Editor, Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withMath = (editor: ReactEditor) => {
  const { isInline, isVoid, normalizeNode } = editor;

  editor.isVoid = (node) => {
    if (node.type === "inline-math" || node.type === "block-math") {
      return true;
    } else {
      return isVoid(node);
    }
  };

  editor.isInline = (node) => {
    if (node.type === "inline-math") {
      return true;
    } else {
      return isInline(node);
    }
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    console.log({node, path})
    
    
    if (
      Element.isElement(node) &&
      node.type === "inline-math" 
      // Editor.isEditor(Node.parent(editor, path))
    ) {

      console.log("I inside normalizeNode")
      Transforms.wrapNodes(
        editor,
        { type: "normal", children: [] },
        { at: path }
      );
      return;
    } 

    normalizeNode(entry)
  };

  return editor;
};
