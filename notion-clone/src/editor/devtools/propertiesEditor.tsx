import { Node, Path, Transforms } from "slate";
import React, { useRef, useState } from "react";
import { InlineEdit } from "./utils/InlineEdit";
import { ReactEditor } from "slate-react";


type PropertiesEditorProps = {
  selectedProperties: null | { node: Node; path: Path };
  editor: ReactEditor;
};

export const PropertiesEditor = ({
  selectedProperties,
  editor,
}: PropertiesEditorProps) => {
  if (!selectedProperties) return null;
  // console.log(selectedProperties)
  const { node, path } = selectedProperties;

  return (
    <div key={`${node.id}_top`}>
      {Object.keys(node).map((keys, i) => {
        if (keys === "devtools_depth" || keys === "devtools_id") return null;
        return (
          <div key={`${node.devtools_id}_${keys}`}>
            <SingleProperty
              keys={keys}
              value={JSON.stringify(node[keys])}
              path={path}
              editor={editor}
            />
          </div>
        );
      })}
    </div>
  );
};

type SingleProperty = {
  keys: string;
  value: string;
  path: Path;
  editor: ReactEditor;
};

const SingleProperty = ({ keys, value, path, editor }: SingleProperty) => {
  const [valueInputValue, setValueInputValue] = useState<string>(value);
  const prevValidState = useRef<string>(valueInputValue);

  const onBlurUpdateSlateValue = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      /*
        Transforms.setNodes() wont work if the key is either childern or text. 
        
        For text we need to use insertText.

        If the key is children then It wont be editable so we dont need to consider that case
        
      */

      if (keys === "text") {
        Transforms.insertText(editor, JSON.parse(valueInputValue), {
          at: path,
        });
      } else {
        Transforms.setNodes(
          editor,
          { [keys]: JSON.parse(valueInputValue) },
          { at: path }
        );
      }
      prevValidState.current = valueInputValue;
    } catch (err) {
      console.error(err);
      setValueInputValue(prevValidState.current);
    }
  };

  return (
    <div style={{ display: "flex", columnGap: "10px" }}>
      <span style={{ color: "blue", cursor: "text" }}>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
            cursor: "text",
            width: "50px",
          }}
        >
          {keys}
        </span>
      </span>
      <span> : </span>

      <span style={{ cursor: "text" }}>
        {/*
            Return <InlineEdit /> excpet for keys whoose value is children. Since we dont
            want it to be editable
          */}
        {keys === "children" ? (
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inline-block",
              cursor: "text",
              width: "200px",
            }}
          >
            {valueInputValue}
          </span>
        ) : (
          <InlineEdit
            style={{ width: "200px" }}
            inputValue={valueInputValue}
            setInputValue={setValueInputValue}
            onBlur={onBlurUpdateSlateValue}
          />
        )}
      </span>
    </div>
  );
};
