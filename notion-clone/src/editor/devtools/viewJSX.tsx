import { Node, createEditor, Editor, Path } from "slate";
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import React, { useState, useMemo, useCallback, useLayoutEffect } from "react";
import { withHistory } from "slate-history";
import { withJSX } from "./utils/withJSX";
import { JsxRenderElement } from "./utils/jsxRenderElement";
import { JsxRenderText } from "./utils/jsxRenderText";
import {PropertiesEditor} from "./propertiesEditor";


type ViewJSXProps = {
  slateValue: Node[];
  
};

export const ViewJSX = ({
  slateValue,
}: ViewJSXProps) => {
  const [jsxSlateValue, setJsxSlateValue] = useState<Node[]>(slateValue);
  const [selectedProperties, setSelectedProperties] = useState<null | {node : Node, path : Path}>(
    null
  );

  const jsxEditor = useMemo(
    () => withJSX(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = useCallback(
    (props : RenderElementProps) => (
      <JsxRenderElement
        {...props}
        setSelectedProperties={setSelectedProperties}
        selectedProperties={selectedProperties}
      />
    ),
    [selectedProperties, setSelectedProperties]
  );
  const renderText = useCallback(
    (props : RenderLeafProps) => (
      <JsxRenderText {...props} setSelectedProperties={setSelectedProperties} selectedProperties={selectedProperties} />
    ),
    [selectedProperties, setSelectedProperties]
  );

  useLayoutEffect(() => {
    for (const entry of Node.nodes(jsxEditor)) {
      jsxEditor.normalizeNode(entry)
    }
  }, []);

  return (
    <div  style={{display : "flex", columnGap : "10rem"}}>
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
      <div>
        <PropertiesEditor selectedProperties={selectedProperties} editor={jsxEditor} />
      </div>
    </div>
  );
};
