import { useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Editor, Node, Path } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import React from "react";
import { RenderElement } from "./renderElement";
import { withIds, withNumber } from "./plugins";
import { SlateEditor } from "./slateEditor";
type MainEditorProps = {
  defaultValue: Node[];
};


export const MainEditor = ({ defaultValue }: MainEditorProps) => {
  const editor = useMemo(
    () => withNumber(withIds(withReact(createEditor()))),
    []
  );
  const [slateValue, setSlateValue] = useState<Node[]>(defaultValue);
  const renderElement = useCallback(
    (props) => <RenderElement {...props}  />,
    []
  );
  // Normalazing the element after the first render since slate doesnt do that by
  // default
  React.useLayoutEffect(() => {
    Editor.normalize(editor);
  }, []);

  // console.log(slateValue)
  return (
    <Slate value={slateValue} editor={editor} onChange={setSlateValue}>
      <Editable
        renderElement={(props) => renderElement(props)}
        data-cy-type="editor"
        onKeyDown={(e) => onKeyDown(e, editor)}
      />
    </Slate>
  );
};


const onKeyDown = (e : React.KeyboardEvent<HTMLDivElement>, editor : ReactEditor) => {
    if (e.key === "Enter") {
      e.preventDefault();
      SlateEditor.insertBreakNumber(editor)
    }
} 