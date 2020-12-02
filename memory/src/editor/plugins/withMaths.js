import {} from "slate";
import {} from "slate-react";

export const withMath = (editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    switch (element.type) {
      case "block-math":
        return element.void;
      case "inline-math":
        return element.void;
      default:
        return isVoid(element);
    }
  };

  return editor;
};
