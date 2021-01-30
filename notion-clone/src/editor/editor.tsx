import React, { useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";

export const Editor = ({
  defaultValue,
}: {
  defaultValue: Node[]
}) => {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [slateValue, setValue] = useState(defaultValue);

  return (
    <Slate editor={editor} value={slateValue} onChange={(n) => setValue(n)}>
      <Editable />
    </Slate>
  );
};
