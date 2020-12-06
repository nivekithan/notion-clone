import { Editor } from "slate";


export const withMath = (editor: Editor) => {
  const { isVoid, isInline } = editor;

  editor.isVoid = (element) => {
    if (element.type === "block-math" || element.type === "inline-math") {
      return element.void ? true : false;
    } else {
      return isVoid(element);
    }
  };

  editor.isInline = (element) => {
    if (element.type === "inline-math") {
      return element.inline ? true : false;
    } else {
      return isInline(element);
    }
  };

  return editor;
};
