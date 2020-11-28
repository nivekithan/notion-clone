import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { useCallback, useMemo, useState } from "react";
import isHotKey from "is-hotkey";

import { Leaf } from "./leaf";
import { MarkButton  } from "./toolbar";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+`": "code",
  "mod+u": "underline",
  "mod+h": "highlight",
};

const LIST_TYPES = ["numberedList", "unOrderedList"];

export const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initalValue);
  const renderLeaf = useCallback(
    (props) => <Leaf {...props} editor={editor} />,
    [editor]
  );

  const handleKeyDown = (e) => {
    for (const hotKey in HOTKEYS) {
      if (isHotKey(hotKey, e)) {
        e.preventDefault();
        const mark = HOTKEYS[hotKey];
        toggleMark(editor, mark);
      }
    }
  };
  return (
    <Slate editor={editor} value={value} onChange={(n) => setValue(n)}>
      <section>
        <MarkButton format={'bold'}  />
      </section>
      <Editable renderLeaf={renderLeaf} onKeyDown={handleKeyDown} />
    </Slate>
  );
};
// ----------------------------------------
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else if (!isActive) {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
// --------------------------------------

// -----------------------------------------------------

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
  });

  const newProperties = {
    type: isActive ? "paragraph" : isList ? "listItem" : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

// ---------------------------

const initalValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "I am bold",
        bold: true,
      },
      {
        text: "I am italic",
        italic: true,
      },
      {
        text: "I am italic and bold",
        italic: true,
        bold: true,
      },
    ],
  },
];
