import React, { useState } from "react";
import { createEditor, Node, Path } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { RenderElement } from "./renderElement";
import { withIds, withIndent, withNumber } from "./plugins";
import { SlateEditor } from "./slateEditor";

// It maintains the path of the elment for id of element
export const ID_TO_PATH = new Map<string, Path>();

export const MainEditor = ({ defaultValue }: { defaultValue: Node[] }) => {
  const editor = React.useMemo(
    () => withNumber(withIndent(withIds(withReact(createEditor())))),
    []
  );
  const [slateValue, setValue] = useState(defaultValue);
  const renderElement = React.useCallback(
    (props, map) => <RenderElement {...props} ID_TO_PATH={map} />,
    []
  );

  // Normalizing the editor once its initalized with defualt values

  React.useLayoutEffect(() => {
    for (const entry of Node.nodes(editor)) {
      editor.normalizeNode(entry);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log({ slateValue });

  return (
    <Slate
      editor={editor}
      value={slateValue}
      onChange={(n) => {
        setValue(n);
      }}
    >
      <Editable
        renderElement={(props) => renderElement(props, ID_TO_PATH)}
        onKeyDown={(e) => {
          onKeyDown(e, editor);
        }}
      />
    </Slate>
  );
};

const onKeyDown = (
  e: React.KeyboardEvent<HTMLDivElement>,
  editor: ReactEditor
) => {
  const currentState = SlateEditor.calculateState(editor);
  if (currentState === "numbered-list") {
    if (e.key === "Enter") {
      e.preventDefault();
      SlateEditor.insertBreakNumber(editor);
    } else if (e.key === "Tab") {
      e.preventDefault();
      SlateEditor.indent(editor);
    }
  } else if (currentState === "normal") {
    if (e.key === "Tab") {
      e.preventDefault();
      SlateEditor.indent(editor);
    }
  } else {
    throw Error("The state is undetectable");
  }
};
