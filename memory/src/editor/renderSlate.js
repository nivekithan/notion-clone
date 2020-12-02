import { InlineMath, BlockMath } from "react-katex";
import { Node, Transforms } from "slate";
import "katex/dist/katex.min.css";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
export const Leaf = ({ attributes, leaf, children }) => {
  const leafUtility = [];

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

export const Element = ({ attributes, element, children }) => {
  switch (element.type) {
    case "heading-1":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-5":
      return <h5 {...attributes}>{children}</h5>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "unordered-list":
      return <ul {...attributes}>{children}</ul>;
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "block-math":
      const children_ = Node.string(element);
      return (
        <div {...attributes}>
          <BlockMathElement
            children_={children_}
            children={children}
            element={element}
          />
          {children}
        </div>
      );
    case "inline-math":
      const inlineChildren = Node.string(element);
      return (
        <span {...attributes}>
          <InlineMathElement
            inlineChildren={inlineChildren}
            element={element}
          />
          {children}
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const BlockMathElement = ({ children_, element }) => {
  const editor = useSlate();
  const focussed = useFocused();
  const selected = useSelected();

  if (focussed && selected) {
    Transforms.setNodes(
      editor,
      { void: false },
      { match: (n) => n.type === "block-math" }
    );
  } else {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { void: true }, { at: path });
  }
  if (!element.void) {
    return null;
  } else {
    return (
      <div contentEditable={false}>
        <BlockMath math={children_} />
      </div>
    );
  }
};

const InlineMathElement = ({ inlineChildren, element }) => {
  const editor = useSlate();
  const focussed = useFocused();
  const selected = useSelected();

  if (focussed && selected) {
    Transforms.setNodes(
      editor,
      { void: false },
      { match: (n) => n.type === "inline-math" }
    );
  } else {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { void: true }, { at: path });
  }
  if (!element.void) {
    return null;
  } else {
    return (
      <span contentEditable={false}>
        <InlineMath math={inlineChildren} />
      </span>
    );
  }
};
