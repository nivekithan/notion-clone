import { Editor, Path, Node, Element } from "slate";
import { ReactEditor } from "slate-react";

export const CustomEditor = {
  ...ReactEditor,

  isInlineMathLast(node: Element) {
    const { children } = node;
    
    if (children[children.length - 1].type === "inline-math") return true;

    return false;
  },

  isInlineMathFirst(node: Element) {
    const { children } = node;

    if (children[0].type === "inline-math") return true;

    return false;
  },
};
