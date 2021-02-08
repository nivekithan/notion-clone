import React, { useState } from "react";
import {
  createEditor,
  Node,
  Editor as NormalEditor,
  Descendant,
  Range,
  Path,
} from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { RenderElement } from "./renderElement";
import { withIds, withMath, withIndent, withNumber } from "./plugins";
import { SlateEditor } from "./slateEditor";
import { useSelectedFragment } from "./hooks";

// It maintains the path of the elment for id of element
export const ID_TO_PATH = new Map<string, Path>();

export const Editor = ({ defaultValue }: { defaultValue: Node[] }) => {
  const editor = React.useMemo(
    () => withNumber(withIndent(withIds(withReact(createEditor())))),
    []
  );
  const [slateValue, setValue] = useState(defaultValue);

  const updateFragment = () => useSelectedFragment(editor);
  const state = () => calculateState(updateFragment);

  const renderElement = React.useCallback(
    (props, map) => <RenderElement {...props} ID_TO_PATH={map} />,
    []
  );

  // Normalizing the editor once its initalized with defualt values
  React.useEffect(() => {
    for (let entry of Node.nodes(editor)) {
      editor.normalizeNode(entry);
    }
  }, []);

  // console.log({slateValue})

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
          onKeyDown(e, state, editor);
        }}
      />
    </Slate>
  );
};

type state = "normal" | "numbered-list";

type editorState = {
  [index: string]: state | undefined;
};

const editorState: editorState = {
  "numbered-list": "numbered-list",
};

// From the selected fragment calculate the state of the editor

const calculateState = (
  updateFragement: () => Descendant[] | undefined
): state => {
  const fragment = updateFragement();

  if (!fragment || fragment.length === 0 || fragment.length > 1)
    return "normal";
  const node = fragment[0];
  const state = editorState[node.type as string];

  if (!state) return "normal";

  return state;
};

const onKeyDown = (
  e: React.KeyboardEvent<HTMLDivElement>,
  state: () => state,
  editor: ReactEditor
) => {
  const currentState = state();
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
