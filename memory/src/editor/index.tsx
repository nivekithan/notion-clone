import { createEditor, Transforms, Node } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact,
} from "slate-react";
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
import { toggleBlock, isBlockActive, toggleMark, isMarkActive } from "./toggle";

// ----------------------------------------------------------------------------------------------------------

interface Hotkeys {
  [propName: string]: string;
  [propName: number]: string;
}

interface synteticKeybaordEvent<T> {
  (e: React.KeyboardEvent<T>): void;
}
const HOTKEYS: Hotkeys = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+h": "highlight",
};

// --------------------------------------------------------------------------------------------------------------
export const SlateEditor = () => {
  const editor = useMemo(
    () => withMath(withReact(createEditor())),
    []
  );
  const [value, setValue] = useState(initalValue);
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const handleKeyDown: synteticKeybaordEvent<HTMLDivElement> = (e) => {
    for (const hotKey in HOTKEYS) {
      if (isHotKey(hotKey, (e as any) as KeyboardEvent)) {
        e.preventDefault();
        const mark = HOTKEYS[hotKey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <div>
      <Slate
        editor={(editor as any) as ReactEditor}
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
    </div>
  );
};
// ------------------------------------------------------------------------------------------------------------------
type Format = {
  format: string;
};

const ElementButton = ({ format }: Format) => {
  const editor = useSlate();

  const setSelection = () => {
    Transforms.setSelection(editor, editor.selection!);
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

const MarkButton = ({ format }: Format) => {
  const editor = useSlate();

  const setSelection = () => {
    Transforms.setSelection(editor, editor.selection!);
  };

  return (
    <Button
      format={format}
      isActive={isMarkActive(editor, format)}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
      setSelection={setSelection}
    />
  );
};
// ------------------------------------------------------------------------------------------------------------------------
interface ForButton extends Format {
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setSelection: () => void;
}

const Button = ({ isActive, format, onClick, setSelection }: ForButton) => {
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

    case "heading-3":
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

interface ForToolButton {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setSelection: () => void;
  children: React.ReactChild;
}

const ToolButton = ({ children, onClick, setSelection }: ForToolButton) => {
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
const initalValue: Node[] = [
  {
    type: "heading-1",
    children: [
      {
        text: "\\frac{3}{4}",
      },
    ],
  },
];
