import { Node, createEditor, Editor, Path } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import React, { useState, useMemo, useCallback, useLayoutEffect } from "react";
import { withHistory } from "slate-history";
import { withJSX } from "./utils/withJSX";
import { JsxRenderElement } from "./utils/jsxRenderElement";
import { JsxRenderText } from "./utils/jsxRenderText";
import {PropertiesEditor} from "./propertiesEditor";


type ViewJSXProps = {
  slateValue: Node[];
  setSelectedProperties: React.Dispatch<React.SetStateAction<{
    node: Node;
    path: Path;
} | null>>
  selectedProperties : null | {node : Node, path : Path}
};

export const ViewJSX = ({
  slateValue,
  setSelectedProperties,
  selectedProperties
}: ViewJSXProps) => {
  const [jsxSlateValue, setJsxSlateValue] = useState<Node[]>(slateValue);

  const jsxEditor = useMemo(
    () => withJSX(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = useCallback(
    (props) => (
      <JsxRenderElement
        {...props}
        setSelectedProperties={setSelectedProperties}
      />
    ),
    []
  );
  const renderText = useCallback(
    (props) => (
      <JsxRenderText {...props} setSelectedProperties={setSelectedProperties} />
    ),
    []
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
