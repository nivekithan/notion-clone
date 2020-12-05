import { Transforms, Editor, Element as SlateElement } from "slate";
import {} from "slate-react";

const LIST_TYPES = ["numbered-list", "unordered-list"];

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
  });

  const newProperties = {
    type: isActive ? "section" : isList ? "list-item" : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
  }
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else if (!isActive) {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};