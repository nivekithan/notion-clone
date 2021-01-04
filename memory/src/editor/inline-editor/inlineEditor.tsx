import { createEditor, Node, Transforms } from "slate";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  ReactEditor,
  useSlate,
} from "slate-react";
import React, { useState } from "react";
import { withMath } from "../plugins/withMath";
import TeX from "@matejmazur/react-katex";
import { InputModal } from "../inputModal";
// --------------------------------------------------------------------------------------------

export type InlineEditorProps = {
  defaultValue : Node[]
}

// --------------------------------------------------------------------------------------------
export const InlineEditor = ({defaultValue} : InlineEditorProps) => {
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
    <span {...attributes} className="relative" contentEditable={false}>
      <span onClick={onMathClick}>
        <TeX math={mathText} />
      </span>

      {isEditing ? (
        <div className="absolute down-0 ">
          <InputModal
            ref={mathEditableRef}
            defaultValue={mathText}
            label="Submit"
            onButtonClick={onSubmit}
          />
        </div>
      ) : null}

      {children}
    </span>
  );
};

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
