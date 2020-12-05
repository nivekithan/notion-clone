import { Transforms } from "slate";
import {} from "slate-react";

export const withMath = (editor) => {
 
  const {isVoid, isInline} = editor
  
  editor.isVoid = (element) => {
    return element.void ? true : false
  }

  editor.isInline = (element) => {
    return element.inline ? true : false
  }

  return editor;
};
