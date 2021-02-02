import React, { useState } from "react";
import { FaNeos } from "react-icons/fa";
import { createEditor, Node, Editor as NormalEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { RenderElement } from "./renderElement";
import { withIds } from "./plugins";
import { SlateEditor } from "./slateEditor";

export const Editor = ({ defaultValue }: { defaultValue: Node[] }) => {
  const editor = React.useMemo(() => withIds(withReact(createEditor())), []);
  const [slateValue, setValue] = useState(defaultValue);
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

  // console.log(slateValue);

  return (
    <Slate editor={editor} value={slateValue} onChange={(n) => setValue(n)}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            SlateEditor.insertBreakNumber(editor);
          }
        }}
      />
    </Slate>
  );
};
