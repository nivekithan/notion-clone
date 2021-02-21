import React, { useContext, useState } from "react";
import { Node, Path, Transforms } from "slate";
import { ReactEditor, withReact } from "slate-react";
import { ScriptRunner } from "./scriptRunner";
import { ViewJSX } from "./viewJSX";

type DevTools = {
  editor: ReactEditor;
  onChange: (n: Node[]) => void;
  slateValue: Node[];
};

export const Devtools = ({ editor, onChange, slateValue }: DevTools) => {
  const [selectedProperties, setSelectedProperties] = useState<null | {node : Node, path : Path}>(
    null
  );

  // console.log(selectedProperties);

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
          width: "1000px",
          minWidth: "100px",
          maxWidth: "100%",
          resize: "horizontal",
        }}
      >
        <ViewJSX
          slateValue={slateValue}
          setSelectedProperties={setSelectedProperties}
          selectedProperties={selectedProperties}
          
        />
      </div>
      <div style={{ backgroundColor: "rgb(40, 42, 54)", resize: "horizontal" }}>
        <ScriptRunner parameters={{ Node, Transforms }} editor={editor} />
      </div>
    </div>
  );
};
