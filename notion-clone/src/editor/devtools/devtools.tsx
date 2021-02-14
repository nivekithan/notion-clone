import React from "react";
import { Node } from "slate";
import { DevEditor } from "./devEditor";
import {ScriptRunner} from "./scriptRunner";


type DevTools = {
  slateValue: Node[];
  setSlateValue: React.Dispatch<React.SetStateAction<Node[]>>;
};

export const Devtools = ({ slateValue, setSlateValue }: DevTools) => {
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
        display : "flex"
      }}
    >
      <div
        style={{
          padding: "40px 40px",
          overflow: "auto",
          minHeight: "400px",
          height : "400px",
          width : "400px",
          minWidth: "100px",
          maxWidth: "100%",
          resize : "horizontal"
        }}
      >
        <DevEditor setSlateValue={setSlateValue} slateValue={slateValue} />
      </div>
      <div style={{backgroundColor: "rgb(40, 42, 54)",}}>
          <ScriptRunner />
      </div>
    </div>
  );
};
