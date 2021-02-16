import React, { useState } from "react";
import { Editor } from "slate";
import { ReactEditor } from "slate-react";
import {exceute} from "./utils/exceute";


type ScriptRunnerProps = {
  parameters ?: {
    [index: string]: unknown;
  };
  editor : ReactEditor
};

export const ScriptRunner = ({ parameters, editor }: ScriptRunnerProps) => {
  const [scriptValue, setScriptValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(exceute(parameters || {}, editor,  scriptValue))
    setScriptValue("");
  };

  const updateScriptValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setScriptValue(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        minWidth: "40px",
        justifyContent: "flex-end",
        height: "100%",
      }}
    >
      <div style={{ height: "100%" }}>SOmething</div>
      <form onSubmit={onSubmit}>
        <input
          name="script"
          type="text"
          value={scriptValue}
          onChange={updateScriptValue}
          style={{
            backgroundColor: "rgba(20, 21, 31, 1)",
            width: "200px",
            padding: "5px",
          }}
        />
      </form>
    </div>
  );
};
