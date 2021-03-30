import React, { useCallback, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { RenderElement } from "./renderElement";

type EditorProps = {
  value: Node[];
  onChange: (n: Node[]) => void;
};

export const Editor = ({ value, onChange }: EditorProps) => {
  const [editor] = useState(withReact(createEditor()));
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );

  return (
    <div className="flex flex-col min-h-screen bg-hex-2F3437 text-white">
      <Slate value={value} onChange={onChange} editor={editor}>
        <Editable renderElement={renderElement} />
      </Slate>
    </div>
  );
};
