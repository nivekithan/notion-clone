import {} from "slate";
import {} from "slate-react";

export const withMath = (editor) => {
  const { isVoid, isInline } = editor;

  editor.isVoid = (element) => {
    return ["inline-math", "block-math"].includes(element.type)
      ? true
      : isVoid(element);
  };

  editor.isInline = (element) => {
    return element.type === "inline-math" ? true : isInline(element);
  };

  return editor;
};
