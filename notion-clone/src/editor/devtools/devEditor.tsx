import React, { useCallback, useMemo, useEffect, useState } from "react";
import { withReact, Slate, Editable } from "slate-react";
import { Node, createEditor } from "slate";
import { RenderElement } from "./renderElement";

type DevEditor = {
  slateValue: Node[];
  setSlateValue: React.Dispatch<React.SetStateAction<Node[]>>;
};

export const DevEditor = ({ slateValue, setSlateValue }: DevEditor) => {
  const content: Node[] = JSON.stringify(slateValue, null, 4)
    .split("\n")
    .map((firstEntry) => {
      return {
        children: [
          {
            text: firstEntry,
          },
        ],
      };
    });

  const devEditor = useMemo(() => withReact(createEditor()), []);
  const [devSlateValue, setDevSlateValue] = useState<Node[]>([
    { type: "list-wrapper", children: content },
  ]);

  const [isSyntaxError, setIsSyntaxError] = useState<boolean>(false);

  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );

  useEffect(() => {
    try {
      const newSlateValue = JSON.parse(Node.string(devEditor));
      setSlateValue(newSlateValue);
      setIsSyntaxError(false);
    } catch (err) {
      setIsSyntaxError(true);
    }
  }, [devSlateValue]);

  return (
    <Slate editor={devEditor} value={devSlateValue} onChange={setDevSlateValue}>
      <Editable spellCheck={false} renderElement={renderElement} />
      {isSyntaxError ? <h1>There is syntax error</h1> : null}
    </Slate>
  );
};
