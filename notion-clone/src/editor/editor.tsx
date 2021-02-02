import React, { useState } from "react";
import { createEditor, Node, Path, Range, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { RenderElement } from "./renderElement";
// import {useGetNodeSelected} from "./hooks"

export const Editor = ({ defaultValue }: { defaultValue: Node[] }) => {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [slateValue, setValue] = useState(defaultValue);
  const renderElement = React.useCallback(
    (props) => <RenderElement {...props} />,
    []
  );
  // const selectedNode = useGetNodeSelected(editor)
  const insertBreakNumber = () => {
    if (!editor.selection) {
      return;
    }

    const [start, end] = [...Range.edges(editor.selection)].map((point) => {
      point.path.length--;
      return point.path;
    });

    console.log({start, end})

    const isSameNode = start === end;

    const startNode = Node.get(editor, start);
    Transforms.splitNodes(editor, { always: true });
    Transforms.setNodes(editor, { number: (startNode.number as number) + 1 });
    synNumber(start)
  };

  const synNumber = (start: Path) => {
    const node = Node.get(editor, start);
    if (!(node.type === "numbered-list"))
      throw new Error(
        "The given path does not return a node which is of type numbered-list \n the given path is" +
          JSON.stringify(start)
      );
      
   for (let [node, path] of Node.levels(editor, start)) {
     console.log(node,path)
   } 
    
  };

  return (
    <Slate editor={editor} value={slateValue} onChange={(n) => setValue(n)}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            insertBreakNumber();
          }
        }}
      />
    </Slate>
  );
};
