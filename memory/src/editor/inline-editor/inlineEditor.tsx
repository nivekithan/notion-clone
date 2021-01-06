import { createEditor, Editor, Node, Range, Transforms } from "slate";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  ReactEditor,
  useSlate,
} from "slate-react";
import React, { Fragment, useState, useEffect } from "react";
import { withMath } from "../plugins/withMath";
import TeX from "@matejmazur/react-katex";
import { InputModal } from "../inputModal";
// --------------------------------------------------------------------------------------------

export type InlineEditorProps = {
  defaultValue: Node[];
};

// --------------------------------------------------------------------------------------------
export const InlineEditor = ({ defaultValue }: InlineEditorProps) => {
  const editor = React.useMemo(() => withReact(withMath(createEditor())), []);
  const [slateValue, setSlateValue] = useState<Node[]>(defaultValue);
  const renderElement = React.useCallback(
    (props) => <RenderElement {...props} />,
    []
  );
  return (
    <div>
      <Slate editor={editor} value={slateValue} onChange={setSlateValue}>
        <Editable renderElement={renderElement} />
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
    case "block-math":
      return <BlockMathElement {...props} />;
    default:
      return <div {...attributes}>{children}</div>;
  }
};
// --------------------------------------------------------------------------------------------

const InlineMathElement = ({
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
    <span className="relative" contentEditable={false}>
      <span onClick={onMathClick} {...attributes}>
        <TeX math={mathText} />
        {children}
      </span>

      {isEditing ? (
        <div className="absolute mt-4 top-4" data-slate-editor>
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

const BlockMathElement = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const mathEditableRef = React.useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const mathText = Node.string(element);

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
    <div
      {...attributes}
      contentEditable={false}
      className="relative"
      id="math-block"
    >
      <div onClick={onMathClick}>
        <TeX math={mathText} block />
      </div>
      {isEditing ? (
        <div className="absolute mt-4 ml-32 top-4 " data-slate-editor="true">
          <InputModal
            ref={mathEditableRef}
            defaultValue={mathText}
            label="Submit"
            onButtonClick={onSubmit}
          />
        </div>
      ) : null}
      {children}
    </div>
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
};

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
