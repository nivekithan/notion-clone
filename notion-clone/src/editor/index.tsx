import React, { useCallback, useState } from "react";
import { createEditor, Node, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { RenderElement } from "./renderElement";
import { onKeyDown } from "./onKeyDown";
import { withDevtools, Devtools } from "slate-devtools";
import { withCore } from "./plugins";
type EditorProps = {
  value: Node[];
  onChange: (n: Node[]) => void;
};

export const Editor = ({ value, onChange }: EditorProps) => {
  const [editor] = useState(withDevtools(withCore(withReact(createEditor()))));
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );

  const onEditorKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => onKeyDown(e, editor),
    [editor]
  );

  return (
    <div className="flex flex-col min-h-screen bg-hex-2F3437 text-white">
      <Slate value={value} onChange={onChange} editor={editor}>
        <Editable renderElement={renderElement} onKeyDown={onEditorKeyDown} />
      </Slate>
      <Devtools editor={editor} value={value} />
    </div>
  );
};
