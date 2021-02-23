import { Node, createEditor, Editor, Path, Transforms } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import React, {
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { withHistory } from "slate-history";
import { withJSX } from "./utils/withJSX";
import { JsxRenderElement } from "./utils/jsxRenderElement";
import { JsxRenderText } from "./utils/jsxRenderText";
import { PropertiesEditor } from "./propertiesEditor";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { giveSrcAndDest } from "./utils/giveSrcAndDest";

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
  });

  const onDragEnd = (res: DropResult) => {
    console.group("OnDragEnd");
    console.log(giveSrcAndDest(jsxEditor, res));
    console.log(jsxSlateValue);

    if (!res.destination) return;

    if (
      res.source.droppableId === res.destination.droppableId &&
      res.source.index === res.destination.index
    )
      return;

    const paths = giveSrcAndDest(jsxEditor, res);

    if (!paths) return;

    const [srcPath, destPath] = paths;

    Transforms.moveNodes(jsxEditor, {
      at: srcPath,
      to: destPath,
      mode: "highest",
    });

    console.groupEnd();
  };

  console.group("SlateValue");
  useEffect(() => {
    console.log(jsxSlateValue);
  });

  console.groupEnd();

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
