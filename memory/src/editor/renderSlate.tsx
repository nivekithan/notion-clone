import  Tex from "@matejmazur/react-katex";
import {  Node, Transforms } from "slate";
import "katex/dist/katex.min.css";
import { ReactEditor, RenderElementProps, RenderLeafProps, useFocused, useSelected, useSlate } from "slate-react";
import { MyEditor } from "./myeditor";

export const Leaf = ({ attributes, leaf, children } : RenderLeafProps) => {
  const leafUtility : string[] = [];

  if (leaf.bold) {
    leafUtility.push(MyEditor.getClassForType("bold"));
  }

  if (leaf.italic) {
    leafUtility.push(MyEditor.getClassForType("italic"));
  }

  if (leaf.underline) {
    leafUtility.push(MyEditor.getClassForType("underline"));
  }

  if (leaf.highlight) {
    leafUtility.push(MyEditor.getClassForType("highlight"));
  }
  // prettier-ignore
  return (
    <span {...attributes} className={leafUtility.join(" ")}>{children}</span>
    );
};

export const Element = ({ attributes, element, children } : RenderElementProps) => {
  const editor = useSlate()
  switch (element.type) {
    case "section":
      return <section {...attributes}  className={MyEditor.getClassForType("section")}>{children}</section>;
    case "heading-1":
      return <h1 {...attributes} className={MyEditor.getClassForType("heading-1")}>{children}</h1>;
    case "numbered-list":
      return <ol {...attributes} className={MyEditor.getClassForType("numbered-list")}>{children}</ol>;
    case "unordered-list":
      return <ul {...attributes} className={MyEditor.getClassForType("unordered-list")}>{children}</ul>;
    case "list-item":
      return <li {...attributes} className={MyEditor.getClassForType("list-item")}>{children}</li>;
    case "block-math":
      // prettier-ignore
      return <BlockMathElement attributes={attributes} element={element} children={children} />
    case "inline-math":
      //prettier-ignore
      return <InlineMathElement attributes={attributes} element={element} children={children} />
    default:
      return null;
  }
};



const BlockMathElement = ({ attributes, element, children } : RenderElementProps) => {
  const editor = useSlate();
  const focused = useFocused();
  const selected = useSelected();

  if (focused && selected) {
    Transforms.setNodes(editor, { void: false });
    return (
      <div {...attributes} className={MyEditor.getClassForType("block-math-focus")}>
        {children}
      </div>
    );
  } else {
    const path = ReactEditor.findPath(editor, element);

    const mathChildren = Node.string(element);
    Transforms.setNodes(editor, { void: true }, { at: path });

    return (
      <div {...attributes} contentEditable={false}>
        <div>
          <Tex math={mathChildren} block />
        </div>
        {children}
      </div>
    );
  }
};

let firstTime = false;
const InlineMathElement = ({ attributes, element, children } : RenderElementProps) => {
  const editor = useSlate();
  const focused = useFocused();
  const selected = useSelected();

  if (focused && selected) {
    Transforms.setNodes(
      editor,
      { void: false },
      { match: (n) => n.type === "inline-math" }
    );
    firstTime = true;
    return (
      <span {...attributes} className={MyEditor.getClassForType("inline-math-focus")}>
        {children}
      </span>
    );
  } else {
    const path = ReactEditor.findPath(editor, element);
    const mathChildren = Node.string(element);
    Transforms.setNodes(editor, { void: true }, { at: path });
    if (firstTime) {
      const selection = editor.selection
      Transforms.deselect(editor);
      if (selection) {
      Transforms.select(editor, selection)
      }
      firstTime = false;
    }

    return (
      <span {...attributes} contentEditable={false}>
        <span>
          <Tex math={mathChildren} />
        </span>
        {children}
      </span>
    );
  }
};
