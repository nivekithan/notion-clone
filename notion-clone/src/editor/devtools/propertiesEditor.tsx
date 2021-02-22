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
  const { node, path } = selectedProperties;

  return (
    <div >
      <div>
        {/*
            This component renderes the properties and also it makes the values editable
          */}

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
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Checks if the property is safe to remove
  const isValidPropertyToRemove = !(keys === "children" || keys === "text");

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

  // onMouseOver set the isHovering to true
  const onMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsHovering(true);
  };

  // onMouseOut set the isHovering to false
  const onMouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsHovering(false);
  };

  /*
    onRemoveButtonClick we have to unset that specfic property

    no need to worry about the possibility that that specfic property might be children or text
    since we wont render the removeButtonIcon if the key is children or text
  */
  const onRemoveButtonClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    Transforms.unsetNodes(editor, keys, { at: path });
  };

  return (
    <div
      style={{ display: "flex", columnGap: "10px" }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <span style={{ color: "blue", cursor: "text" }}>
        {/*
        This component renders the keys
      */}

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

      <span>
        {/*
            This component renders the remove icon to remove the properties. Excepth for children key and text key
          */}
        {isHovering && isValidPropertyToRemove ? (
          <span
            style={{
              color: "red",
              height: "10px",
              width: "10px",
              cursor: "pointer",
            }}

            onClick={onRemoveButtonClick}
          >
            X
          </span>
        ) : (
          <span style={{ height: "10px", width: "10px" }}></span>
        )}
      </span>
    </div>
  );
};
