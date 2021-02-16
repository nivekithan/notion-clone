import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  ReactChild,
} from "react";
import { withReact, Slate, Editable, ReactEditor } from "slate-react";
import { Node, createEditor } from "slate";
import { RenderElement } from "./renderElement";
import { withHistory } from "slate-history";
import useDeepCompareEffect from "use-deep-compare-effect";
import { DevNode } from "./utils/node";
import { ErrorBoundary } from "./ErrorBoundry";

type DevEditor = {
  editor: ReactEditor;
  onChange: (n: Node[]) => void;
  slateValue: Node[];
};

export const DevEditor = ({ editor, onChange, slateValue }: DevEditor) => {
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

  const devEditor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [devSlateValue, setDevSlateValue] = useState<Node[]>([
    { type: "list-wrapper", children: content },
  ]);

  const [isSyntaxError, setIsSyntaxError] = useState<boolean>(false);

  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );

  console.log(devSlateValue);

  useDeepCompareEffect(() => {
    try {
      const newSlateValue = JSON.parse(Node.string(devEditor)) as unknown;

      /*
        In slate v0.59.0 Node.isNodeList has a bug see
        https://github.com/ianstormtaylor/slate/issues/4077
       */
      if (DevNode.isNodeList(newSlateValue)) {
        onChange(newSlateValue);
        setIsSyntaxError(false);
      } else {
        throw new Error("The newSlateValue is not Node[]");
      }
    } catch (err) {
      setIsSyntaxError(true);
    }
  }, [devSlateValue, devEditor, setIsSyntaxError]);

  useDeepCompareEffect(() => {
    setDevSlateValue([{ type: "list-wrapper", children: content }]);
  }, [slateValue]);

  return (
    <ErrorBoundary editor={devEditor} devSlateValue={devSlateValue}>
      <Slate
        editor={devEditor}
        value={devSlateValue}
        onChange={setDevSlateValue}
      >
        <Editable spellCheck={false} renderElement={renderElement} />
        {isSyntaxError ? <h1>There is syntax error</h1> : null}
      </Slate>
    </ErrorBoundary>
  );
};
