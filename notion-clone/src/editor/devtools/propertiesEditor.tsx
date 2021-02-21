import { Node, Path, Transforms } from "slate";
import React, { useRef, useState } from "react";
import { InlineEdit } from "./utils/InlineEdit";
import { ReactEditor } from "slate-react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable,
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

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

  const onDragEnd = (res: DropResult, provided: ResponderProvided) => {
    const {draggableId, source, destination} = res;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ONLY_ONE_DROPPABLE">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} key={`${node.id}_top`}>
            {Object.keys(node).map((keys, i) => {
              if (keys === "devtools_depth" || keys === "devtools_id")
                return null;
              return (
                <Draggable
                  draggableId={`${node.devtools_id}_${keys}`}
                  index={i}
                >
                  {(provided) => (
                    <div
                      key={`${node.devtools_id}_${keys}`}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <SingleProperty
                        keys={keys}
                        value={JSON.stringify(node[keys])}
                        path={path}
                        editor={editor}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

type SingleProperty = {
  keys: string;
  value: string;
  path: Path;
  editor: ReactEditor;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
};

const SingleProperty = ({
  keys,
  value,
  path,
  editor,
  dragHandleProps,
}: SingleProperty) => {
  const [valueInputValue, setValueInputValue] = useState<string>(value);
  const [isHovering, setIsHovering] = useState<boolean>(false);
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

  /*
    OnMouseOver update the isHovering to true
  */
  const onMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const onMouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsHovering(false);
  };

  return (
    <div
      style={{ display: "flex", columnGap: "10px" }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {isHovering ? (
        <span
          style={{ color: "orange", width: "20px", height: "20px" }}
          {...dragHandleProps}
        >
          %
        </span>
      ) : (
        <span style={{ width: "20px", height: "20px" }}> </span>
      )}
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
