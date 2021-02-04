import React, { useState } from "react";
import { createEditor, Node, Editor as NormalEditor, Descendant } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { RenderElement } from "./renderElement";
import { withIds, withMath } from "./plugins";
import { SlateEditor } from "./slateEditor";
import { useSelectedFragment } from "./hooks";

export const Editor = ({ defaultValue }: { defaultValue: Node[] }) => {
  const editor = React.useMemo(() => withIds(withReact(createEditor())), []);
  const [slateValue, setValue] = useState(defaultValue);

  const updateFragment = () => useSelectedFragment(editor);
  const state = () => calculateState(updateFragment);

  const renderElement = React.useCallback(
    (props) => <RenderElement {...props} />,
    []
  );

  // Normalizing the editor once its initalized with defualt values
  React.useEffect(() => {
    for (let entry of Node.nodes(editor)) {
      editor.normalizeNode(entry);
    }
  }, []);

  // React.useEffect(() => {
  //   selectedFragment;
  // });

  console.dir(slateValue)
  // console.log(editor.operations)
  return (
    <Slate
      editor={editor}
      value={slateValue}
      onChange={(n) => {
        setValue(n);
      }}
    >
      <Editable
        renderElement={renderElement}
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
    }
  } else if (currentState === "normal") {
  } else {
    throw Error("The state is undectable");
  }
};
