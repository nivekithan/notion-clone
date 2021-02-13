import { useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Editor, Node, Path } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import React from "react";
import { RenderElement } from "./renderElement";
import { withDepth, withIds, withNumber } from "./plugins";
import { SlateEditor, onKeyDown } from "./utils";
type MainEditorProps = {
  defaultValue: Node[];
};

export const MainEditor = ({ defaultValue }: MainEditorProps) => {
  const editor = useMemo(
    () => withDepth(withNumber(withIds(withReact(createEditor())))),
    []
  );
  const [slateValue, setSlateValue] = useState<Node[]>(defaultValue);
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );
  // Normalazing the element after the first render since slate doesnt do that by
  // default
  React.useLayoutEffect(() => {
    Editor.normalize(editor);
  }, []);

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
