import { useCallback, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import React from "react";
import { RenderElement } from "./renderElement";

type MainEditorProps = {
  defaultValue: Node[];
};

const ID_TO_PATH = new Map();

export const MainEditor = ({ defaultValue }: MainEditorProps) => {
  const edtior = useMemo(() => withReact(createEditor()), []);

  const [slateValue, setSlateValue] = useState<Node[]>(defaultValue);
  const renderElement = useCallback(
    (props, map) => <RenderElement {...props} ID_TO_PATH={map} />,
    []
  );

  return (
    <Slate value={slateValue} editor={edtior} onChange={setSlateValue}>
      <Editable renderElement={(props) => renderElement(props, ID_TO_PATH)} data-cy-type="editor" />
    </Slate>
  );
};
