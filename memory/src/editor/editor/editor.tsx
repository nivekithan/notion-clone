import { createEditor, Node } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import React, { useState } from "react";
import { withMath, withQuestions } from "../plugins/";

import { RenderElement } from "./renderElement";
import { RenderLeaf } from "./renderLeaf";

import { SlateMenu } from "./menu";
import { onKeyDown } from "./onKeyDown";
// -------------------------------------------------------------------
export type EditorProps = {
  defaultValue: Node[];
};
// -------------------------------------------------------------------

export const Editor = (props: EditorProps) => {
  const editor = React.useMemo(
    () => withQuestions(withMath(withReact(createEditor()))),
    []
  );
  const [slateValue, setSlateValue] = useState<Node[]>(props.defaultValue);
  const [menuValue, setMenuValue] = useState<{
    menuShould: boolean;
    menuQuery: string | "";
  }>({
    menuShould: false,
    menuQuery: "",
  });

  const renderElement = React.useCallback(
    (args) => <RenderElement {...args} />,
    []
  );
  const renderLeaf = React.useCallback((args) => <RenderLeaf {...args} />, []);

  return (
    <div className="px-4 ml-4 border border-white-100 bg-black-main-normal">
      <Slate value={slateValue} onChange={setSlateValue} editor={editor}>
        <SlateMenu
          shouldShow={menuValue.menuShould}
          queryString={menuValue.menuQuery}
        />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(e) => onKeyDown(e, menuValue.menuShould, setMenuValue)}
        />
      </Slate>
    </div>
  );
};

// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
