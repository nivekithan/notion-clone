import { Node, createEditor, Editor, Path } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import React, { useState, useMemo, useCallback, useLayoutEffect } from "react";
import { withHistory } from "slate-history";
import { withJSX } from "./utils/withJSX";
import { JsxRenderElement } from "./utils/jsxRenderElement";
import { JsxRenderText } from "./utils/jsxRenderText";
import { PropertiesEditor } from "./propertiesEditor";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

type ViewJSXProps = {
  slateValue: Node[];
};

export const ViewJSX = ({ slateValue }: ViewJSXProps) => {
  const [jsxSlateValue, setJsxSlateValue] = useState<Node[]>(slateValue);
  const [selectedProperties, setSelectedProperties] = useState<null | {
    node: Node;
    path: Path;
  }>(null);

  const jsxEditor = useMemo(
    () => withJSX(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <JsxRenderElement
        {...props}
        setSelectedProperties={setSelectedProperties}
        selectedProperties={selectedProperties}
      />
    ),
    [selectedProperties, setSelectedProperties]
  );
  const renderText = useCallback(
    (props: RenderLeafProps) => (
      <JsxRenderText
        {...props}
        setSelectedProperties={setSelectedProperties}
        selectedProperties={selectedProperties}
      />
    ),
    [selectedProperties, setSelectedProperties]
  );

  useLayoutEffect(() => {
    for (const entry of Node.nodes(jsxEditor)) {
      jsxEditor.normalizeNode(entry);
    }
  }, []);

  const onDragEnd = () => {};

  return (
    <div style={{ display: "flex", columnGap: "10rem" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="editor">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Slate
                editor={jsxEditor}
                value={jsxSlateValue}
                onChange={setJsxSlateValue}
              >
                <Editable
                  readOnly
                  renderElement={renderElement}
                  renderLeaf={renderText}
                />
              </Slate>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <PropertiesEditor
          selectedProperties={selectedProperties}
          editor={jsxEditor}
        />
      </div>
    </div>
  );
};
