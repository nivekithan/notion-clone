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
      const divUtility = ["flex", "justify-center"];
      return (
        <div {...attributes} className={divUtility.join(" ")}>
          <MathElement
            inlineChildren={children_}
            element={element}
            format={"block-math"}
          />
          <span className={"math-highlight"}>{children}</span>
        </div>
      );
    case "inline-math":
      const inlineChildren = Node.string(element);
      const spanUtility = [
        "inline"
      ]
      return (
        <span {...attributes} className={spanUtility.join(" ")}>
          <MathElement
            inlineChildren={inlineChildren}
            element={element}
            format={"inline-math"}
          />
          <span className={"math-highlight"}>{children}</span>
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const MathElement = ({ inlineChildren, element, format }) => {
  const editor = useSlate();
  const focussed = useFocused();
  const selected = useSelected();

  if (focussed && selected) {
    Transforms.setNodes(
      editor,
      { void: false },
      { match: (n) => n.type === format }
    );
  } else {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { void: true }, { at: path });
  }

  if (!element.void) {
    return null;
  } else {
    switch (format) {
      case "inline-math":
        return (
          <span contentEditable={false}>
            <InlineMath math={inlineChildren} />
          </span>
        );
      case "block-math":
        return (
          <div contentEditable={false}>
            <BlockMath math={inlineChildren} />
          </div>
        );
      default:
        return null;
    }
  }
};
