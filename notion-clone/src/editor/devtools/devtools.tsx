import React, { useMemo } from "react";
import { Node, createEditor, Transforms } from "slate";
import { ReactEditor, withReact } from "slate-react";
import { DevEditor } from "./devEditor";
import { ScriptRunner } from "./scriptRunner";

type DevTools = {
  editor: ReactEditor;
  onChange: (n: Node[]) => void;
  slateValue: Node[];
};

export const Devtools = ({ editor, onChange, slateValue }: DevTools) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(40, 42, 54)",
        color: "rgb(255 , 255, 255)",
        margin: "10% 10%",
        minHeight: "400px",
        maxHeight: "400px",
        minWidth: "400px",
        borderRadius: "30px",
        display: "flex",
      }}
    >
      <div
        style={{
          padding: "40px 40px",
          overflow: "auto",
          minHeight: "400px",
          height: "400px",
          width: "400px",
          minWidth: "100px",
          maxWidth: "100%",
          resize: "horizontal",
        }}
      >
        <DevEditor
          onChange={onChange}
          editor={editor}
          slateValue={slateValue}
        />
      </div>
      <div style={{ backgroundColor: "rgb(40, 42, 54)" }}>
        <ScriptRunner parameters={{ Node, Transforms }} editor={editor} />
      </div>
    </div>
  );
};
