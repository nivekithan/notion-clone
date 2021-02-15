import { useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Editor, Node, Path } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import React from "react";
import { RenderElement } from "./renderElement";
import { withDepth, withIds, withNumber } from "./plugins";
import { SlateEditor, onKeyDown } from "./utils";

type MainEditorProps = {
  slateValue: Node[];
  setSlateValue: React.Dispatch<React.SetStateAction<Node[]>>;
  editor: ReactEditor;
};

export const MainEditor = ({
  slateValue,
  editor,
  setSlateValue,
}: MainEditorProps) => {
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );

  // Normalazing the element after the first render since slate doesnt do that by
  // default
  React.useLayoutEffect(() => {
    Editor.normalize(editor);
  }, []);

  return (
    <Slate value={slateValue} editor={editor} onChange={setSlateValue}>
      <Editable
        renderElement={(props) => renderElement(props)}
        data-cy-type="editor"
        onKeyDown={(e) => onKeyDown(e, editor)}
        onSelect={(e) => {
          /**
           * Chrome doesn't scroll at bottom of the page. This fixes that.
           */
          if (!(window as any).chrome) return;
          if (editor.selection == null) return;
          try {
            /**
             * Need a try/catch because sometimes you get an error like:
             *
             * Error: Cannot resolve a DOM node from Slate node: {"type":"p","children":[{"text":"","by":-1,"at":-1}]}
             */
            const domPoint = ReactEditor.toDOMPoint(
              editor,
              editor.selection.focus
            );
            const node = domPoint[0];
            if (node == null) return;
            const element = node.parentElement;
            if (element == null) return;
            element.scrollIntoView({ behavior: "smooth", block: "nearest" });
          } catch (e) {
            /**
             * Empty catch. Do nothing if there is an error.
             */
          }
        }}
      />
    </Slate>
  );
};
