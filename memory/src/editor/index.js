import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import { useCallback, useMemo, useState } from "react";
import isHotKey from "is-hotkey";

import { Leaf, Element } from "./renderSlate";
import {
  FaBold,
  FaGripfire,
  FaHeading,
  FaHighlighter,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaUnderline,
} from "react-icons/fa";

import { CgMathMinus, CgMathPlus } from "react-icons/cg";

import { withMath } from "./plugins";
// ----------------------------------------------------------------------------------------------------------
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+h": "highlight",
};

const LIST_TYPES = ["numbered-list", "unordered-list"];
// --------------------------------------------------------------------------------------------------------------
export const SlateEditor = () => {
  const editor = useMemo(() => withMath(withReact(createEditor())), []);
  const [value, setValue] = useState(initalValue);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const handleKeyDown = (e) => {
    for (const hotKey in HOTKEYS) {
      if (isHotKey(hotKey, e)) {
        e.preventDefault();
        const mark = HOTKEYS[hotKey];
        toggleMark(editor, mark);
      }
    }
  };
  // console.log(value);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(n) => {
        setValue(n);
      }}
    >
      <section>
        <MarkButton format={"bold"} />
        <MarkButton format={"highlight"} />
        <MarkButton format={"italic"} />
        <MarkButton format={"underline"} />
        <ElementButton format={"heading-1"} />
        <ElementButton format={"heading-5"} />
        <ElementButton format={"block-quote"} />
        <ElementButton format={"numbered-list"} />
        <ElementButton format={"unordered-list"} />
        <ElementButton format={"block-math"} />
        <ElementButton format={"inline-math"} />
      </section>
      <Editable
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        onKeyDown={handleKeyDown}
      />
    </Slate>
  );
};
// ----------------------------------------------------------------------------------------------------------
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
// -------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------

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
    type: isActive ? "paragraph" : isList ? "list-item" : format,
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

// ------------------------------------------------------------------------------------------------------------------

const ElementButton = ({ format }) => {
  const editor = useSlate();

  const setSelection = () => {
    Transforms.setSelection(editor, editor.selection);
  };

  return (
    <Button
      format={format}
      isActive={isBlockActive(editor, format)}
      onClick={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
      setSelection={setSelection}
    />
  );
};

const MarkButton = ({ format }) => {
  const editor = useSlate();

  const setSelection = () => {
    Transforms.setSelection(editor, editor.selection);
  };

  return (
    <Button
      format={format}
      isActive={isMarkActive(editor, format)}
      onClick={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
      setSelection={setSelection}
    />
  );
};
// ------------------------------------------------------------------------------------------------------------------------
const Button = ({ isActive, format, onClick, setSelection }) => {
  const iconColor = isActive ? "red" : "blue";

  switch (format) {
    case "bold":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaBold color={iconColor} />
        </ToolButton>
      );
    case "italic":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaItalic color={iconColor} />
        </ToolButton>
      );
    case "underline":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaUnderline color={iconColor} />
        </ToolButton>
      );

    case "highlight":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaHighlighter color={iconColor} />
        </ToolButton>
      );
    case "heading-1":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaHeading color={iconColor} />
        </ToolButton>
      );

    case "heading-5":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaGripfire color={iconColor} />
        </ToolButton>
      );
    case "block-quote":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaQuoteRight color={iconColor} />
        </ToolButton>
      );
    case "numbered-list":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaListOl color={iconColor} />
        </ToolButton>
      );
    case "unordered-list":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <FaListUl color={iconColor} />
        </ToolButton>
      );
    case "block-math":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <CgMathPlus color={iconColor} />
        </ToolButton>
      );
    case "inline-math":
      return (
        <ToolButton onClick={onClick} setSelection={setSelection}>
          <CgMathMinus color={iconColor} />
        </ToolButton>
      );
    default:
      return null;
  }
};

const ToolButton = ({ children, onClick, setSelection }) => {
  const buttonUtility = [
    "cursor-pointer",
    "inline-block",
    "bg-gray-100",
    "p-1",
  ];

  return (
    <button
      className={buttonUtility.join(" ")}
      onMouseDown={(e) => {
        onClick(e);
        setSelection();
      }}
    >
      {children}
    </button>
  );
};
// ---------------------------------------------------------------
// -----------------------------------------------------------------
const initalValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "I am math",
      },
      {
        type: "inline-math",
        inline: true,
        children: [
          {
            text: "\\frac{4}{5}",
          },
        ],
      },
    ],
  },
];
