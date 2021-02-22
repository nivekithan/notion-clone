import { Node, Path, Transforms } from "slate";
import React, { CSSProperties, useRef, useState } from "react";
import { InlineEdit } from "./utils/InlineEdit";
import { ReactEditor } from "slate-react";
import { usePopper } from "react-popper";
import ReactDOM from "react-dom";
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
    <div>
      <div
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      >
        {/*
            Renders the component that allows to add properties to the selected node
          */}
        <AddProperties editor={editor} path={path} />
      </div>

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

      <span style={{ height: "10px", width: "10px" }}>
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
          <span></span>
        )}
      </span>
    </div>
  );
};

type AddPropertiesProps = {
  editor: ReactEditor;
  path: Path;
};

const AddProperties = ({ editor, path }: AddPropertiesProps) => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElemenet] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  const [isCreatingNewProperty, setIsCreatingNewProperty] = useState<boolean>(
    false
  );

  // onClickingPlusButton  set isCreatingeNewProperty to true
  const onClickingPlusButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsCreatingNewProperty(true);
  };

  return (
    <div>
      <button ref={setReferenceElement} onClick={onClickingPlusButton}>
        +
      </button>
      {isCreatingNewProperty ? (
        <AddPropertiesEditor
          innerRef={setPopperElemenet}
          styles={styles}
          attributes={attributes}
          setIsCreatingNewProperty={setIsCreatingNewProperty}
          editor={editor}
          path={path}
        />
      ) : null}
    </div>
  );
};

type AddPropertiesEditorProps = {
  innerRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  styles: {
    [key: string]: React.CSSProperties;
  };
  attributes: {
    [key: string]:
      | {
          [key: string]: string;
        }
      | undefined;
  };
  setIsCreatingNewProperty: React.Dispatch<React.SetStateAction<boolean>>;
  editor: ReactEditor;
  path: Path;
};

const AddPropertiesEditor = ({
  innerRef,
  styles,
  attributes,
  setIsCreatingNewProperty,
  editor,
  path,
}: AddPropertiesEditorProps) => {
  const [keyInputValue, setKeyInputValue] = useState<string>('""');
  const [valueInputValue, setValueInputValue] = useState<string>('""');

  const onCancelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsCreatingNewProperty(false);
  };

  const onOkayClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const key = JSON.parse(keyInputValue);
      const value = JSON.parse(valueInputValue);

      // Checking if the key is of valid key i.e key is not either children or text

      if (key === "children" || key === "text")
        throw new Error(`Key is ${key}: Change the key`);

      Transforms.setNodes(editor, { [key]: value }, { at: path });
      setIsCreatingNewProperty(false);
    } catch (err) {}
  };

  const inputStyle: CSSProperties = {
    backgroundColor: "inherit",
    color: "white",
    padding: "0px 2px",
    fontSize: "14px",
  };

  return ReactDOM.createPortal(
    <div
      style={{
        ...styles.popper,
        backgroundColor: "blue",
        borderRadius: "5px",
        zIndex: 999,
        boxShadow: "3px 1px 7px 2px rgb(40, 42, 54)",
      }}
      ref={innerRef}
      {...attributes.popper}
    >
      <div
        style={{
          display: "flex",
          columnGap: "10px",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <span>
          <input
            placeholder="Key"
            type="text"
            style={{ ...inputStyle, width: "100px" }}
            value={keyInputValue}
            onChange={(e) => setKeyInputValue(e.currentTarget.value)}
          />
        </span>
        <span style={{ color: "white" }}>:</span>
        <span>
          <input
            placeholder="value"
            type="text"
            style={{ ...inputStyle, width: "100px" }}
            value={valueInputValue}
            onChange={(e) => setValueInputValue(e.currentTarget.value)}
          />{" "}
        </span>
        <button style={{ color: "ButtonFace" }} onClick={onOkayClick}>
          OK
        </button>
        <button style={{ color: "red" }} onClick={onCancelClick}>
          X
        </button>
      </div>
    </div>,
    document.body
  );
};
