import { createEditor, Node } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import React, { useState } from "react";
import { withMath } from "../plugins/withMath";
import {RenderElement} from "./renderElement";

// -------------------------------------------------------------------
export type EditorProps = {};
// -------------------------------------------------------------------

export const Editor = (props: EditorProps) => {
  const editor = React.useMemo(() => withReact(withMath(createEditor())), []);
  const [slateValue, setSlateValue] = useState<Node[]>(initialValue);
  const renderElement = React.useCallback((args) => <RenderElement {...args} />, [])

  return (
    <div className="px-4 ml-4 border border-black-sidebar-normal">
      <Slate value={slateValue} onChange={setSlateValue} editor={editor}>
        <Editable renderElement={renderElement} />
      </Slate>
    </div>
  );
};

// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------

const initialValue: Node[] = [
  {
    children: [
      {
        text: "",
      },
    ],
  },
];
