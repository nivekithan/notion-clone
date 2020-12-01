import {} from "slate";
import {} from "slate-react";

export const withMath = (editor) => {
  const { isVoid,  } = editor;

  editor.isVoid = (element) => {
    switch (element.type) {
      case "block-math":
        return true;
      case "inline-math":
        return true;
      default:
        return isVoid(element);
    }
  };

  return editor;
};
