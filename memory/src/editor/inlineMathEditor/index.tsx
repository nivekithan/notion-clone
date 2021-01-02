import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  useEditor,
  withReact,
} from "slate-react";
import { createEditor, Node, Transforms } from "slate";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import TeX from "@matejmazur/react-katex";
import { withMath } from "../plugins/withMath";
import { useForm } from "react-hook-form";
// ------------------------------------------------------------------------------------

export type InlineEditorProps = {
  defaultValue: Node[];
};

type InlineMathProps = {
  math: string;
};

// ------------------------------------------------------------------------------------
export const InlineEditor = ({ defaultValue }: InlineEditorProps) => {
  const editor = useMemo(() => withMath(withReact(createEditor())), []);
  const [slateValue, setSlateValue] = useState<Node[]>(defaultValue);

  const renderElement = useCallback((args) => <RenderElement {...args} />, []);

  return (
    <Slate
      editor={editor}
      value={slateValue}
      onChange={(n) => setSlateValue(n)}
    >
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

const RenderElement = (props: RenderElementProps) => {
  const { children, element, attributes } = props;

  switch (element.type) {
    case "normal":
      return <div {...attributes}>{children}</div>;
    case "inline-math":
      return <InlineMath {...props} />;
    default:
      return <div {...attributes}>{children}</div>;
  }
};

const InlineMath = (props: RenderElementProps) => {
  const { children, element, attributes } = props;
  const [isEditable, setIsEditable] = useState(false);
  const editor = useEditor();
  const { register, handleSubmit } = useForm<InlineMathProps>({
    defaultValues: {
      math: Node.string(element),
    },
  });

  const onMathClick: (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void = (e) => {
    e.preventDefault();
    setIsEditable((t) => !t);
  };

  const onSubmit = handleSubmit((data) => {
    Transforms.insertText(editor, data.math, {
        at : ReactEditor.findPath(editor, element),
        voids : true
    });
    console.log(editor.children)
    setIsEditable(false)
  })
  return (
    <div {...attributes} contentEditable={false} className="inline-block">
      <div className="relative">
        <div onClick={onMathClick}>
          <TeX math={Node.string(element)} />
        </div>
        {!isEditable ? null : (
          <div className="absolute bg-black-main-normal">
            <form className="flex" onSubmit={onSubmit}>
              <input name="math" ref={register} type="text" />
              <input type="submit" />
            </form>
          </div>
        )}
      </div>
      <div contentEditable={false}>{children}</div>
    </div>
  );
}
