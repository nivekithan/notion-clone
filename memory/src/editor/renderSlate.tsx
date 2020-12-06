import  Tex from "@matejmazur/react-katex";
import {  Node, Transforms } from "slate";
import "katex/dist/katex.min.css";
import { ReactEditor, RenderElementProps, RenderLeafProps, useFocused, useSelected, useSlate } from "slate-react";


export const Leaf = ({ attributes, leaf, children } : RenderLeafProps) => {
  const leafUtility : string[] = [];

  if (leaf.bold) {
    leafUtility.push("font-semibold");
  }

  if (leaf.italic) {
    leafUtility.push("italic");
  }

  if (leaf.underline) {
    leafUtility.push("underline");
  }

  if (leaf.highlight) {
    leafUtility.push("highlight");
  }
  // prettier-ignore
  return (
    <span {...attributes} className={leafUtility.join(" ")}>{children}</span>
    );
};

export const Element = ({ attributes, element, children } : RenderElementProps) => {
  switch (element.type) {
    case "section":
      return <section {...attributes}  className={"default-text"}>{children}</section>;
    case "heading-1":
      return <h1 {...attributes} className={"heading-1"}>{children}</h1>;
    case "heading-3":
      return <h3 {...attributes} className={"heading-3"}>{children}</h3>;
    case "numbered-list":
      return <ol {...attributes} className={"numbered-list"}>{children}</ol>;
    case "unordered-list":
      return <ul {...attributes} className={"unordered-list"}>{children}</ul>;
    case "list-item":
      return <li {...attributes} className={"default-list"}>{children}</li>;
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
    const textUtility = ["math-highlight", "flex", "justify-center", "w-auto"];
    return (
      <div {...attributes} className={textUtility.join(" ")}>
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
      <span {...attributes} className={"math-highlight"}>
        {children}
      </span>
    );
  } else {
    const path = ReactEditor.findPath(editor, element);
    const mathChildren = Node.string(element);
    Transforms.setNodes(editor, { void: true }, { at: path });
    if (firstTime) {
      Transforms.deselect(editor);
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
