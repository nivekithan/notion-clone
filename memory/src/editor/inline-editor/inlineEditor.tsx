import { createEditor, Editor, Element, Node, Range, Transforms } from "slate";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  ReactEditor,
  useSlate,
  RenderLeafProps,
} from "slate-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { withMath } from "../plugins/withMath";
import TeX from "@matejmazur/react-katex";
import { InputModal } from "../inputModal";
import { CgMathPlus } from "react-icons/cg";
// --------------------------------------------------------------------------------------------

export type InlineEditorProps = {
  defaultValue: Node[];
};

// --------------------------------------------------------------------------------------------
export const InlineEditor = ({ defaultValue }: InlineEditorProps) => {
  const editor = React.useMemo(() => withMath(withReact(createEditor())), []);
  const [slateValue, setSlateValue] = useState<Node[]>(defaultValue);
  const renderElement = React.useCallback(
    (props) => <RenderElement {...props} />,
    []
  );
  const renderLeaf = React.useCallback(
    (props) => <RenderLeaf {...props} />,
    []
  );

  useEffect(() => {
    for (let entry of Node.children(editor, [])) {
      editor.normalizeNode(entry)
    }
  }, [])
  return (
    <div className=" bg-black-main-normal">
      <Slate editor={editor} value={slateValue} onChange={setSlateValue}>
        <HoverToolbar />
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
      </Slate>
    </div>
  );
};
// --------------------------------------------------------------------------------------------

const RenderElement = (props: RenderElementProps) => {
  const { element, attributes, children } = props;

  switch (element.type) {
    case "normal":
      return <div {...attributes}>{children}</div>;
    case "inline-math":
      return <InlineMathElement {...props} />;
    default:
      return <div {...attributes}>{children}</div>;
  }
};

const RenderLeaf = (props: RenderLeafProps) => {
  const { attributes, children } = props;

  return (
    <span {...attributes} className="text-white-white">
      {children}
    </span>
  );
};

// --------------------------------------------------------------------------------------------

export const InlineMathElement = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const mathEditableRef = React.useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const mathText: string = Node.string(element);

  const onMathClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setIsEditing((s) => !s);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!mathEditableRef.current) return;

    const text = mathEditableRef.current.innerText;
    Transforms.insertText(editor, text, {
      at: ReactEditor.findPath(editor, element),
      voids: true,
    });

    setIsEditing(false);
  };

  
  
  return (
    <span className="relative px-1" contentEditable={false}>
      <span onClick={onMathClick} {...attributes} className="text-white-white ">
        <TeX math={mathText} />
        {children}
      </span>

      {isEditing ? (
        <div className="absolute z-10 opacity-100 t-4 r top-4" data-slate-editor>
          <InputModal
            ref={mathEditableRef}
            defaultValue={mathText}
            label="Submit"
            onButtonClick={onSubmit}
          />
        </div>
      ) : null}
    </span>
  );
};

// --------------------------------------------------------------------------------------------
const HoverToolbar = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection() as Selection;
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return createPortal(
    <div
      ref={ref}
      className="absolute flex items-center justify-center px-4 py-4 opacity-0 bg-black-main-normal -top-outside -left-outside"
    >
      <Icon>
        <CgMathPlus color="#fff" />
      </Icon>
    </div>,
    document.body
  );
};

// --------------------------------------------------------------------------------------------

const Icon = ({ children }: { children: React.ReactNode }) => {
  const editor = useSlate();

  const onIconClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggleMath(editor);
  };

  return <button onClick={onIconClick}>{children}</button>;
};

const isMathActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "inline-math",
  });

  return !!match;
};

const toggleMath = (editor: Editor) => {
  const isActive = isMathActive(editor);

  if (isActive) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "inline-math",
    });
  } else {
    const { selection } = editor;
    const isConfused = selection && Range.isCollapsed(selection);

    const inlineMath = {
      type: "inline-math",
      children: [],
    };

    if (isConfused) {
      Transforms.insertNodes(editor, inlineMath);
    } else {
      Transforms.wrapNodes(editor, inlineMath, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  }
};

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
