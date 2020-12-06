import { Transforms, Editor, Element as SlateElement} from "slate";
import {} from "slate-react";

const LIST_TYPES : string[] = ["numbered-list", "unordered-list"];

export const toggleBlock = (editor : Editor, format : string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type) as string
      ),
  });

  const newProperties : {type: string} = {
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

export const isBlockActive = (editor : Editor, format : string) => {
  const [match]  = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const toggleMark = (editor:Editor , format:string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else if (!isActive) {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};