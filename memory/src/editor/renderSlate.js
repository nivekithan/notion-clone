import { InlineMath, BlockMath } from "react-katex";
import { Editor, Node, Transforms } from "slate";
import "katex/dist/katex.min.css";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import { useState } from "react";

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
      const children_ = element.text_ ;
      const divUtility = ["flex", "justify-center"];
      return (
        <div
          {...attributes}
          className={divUtility.join(" ")}
          contentEditable={false}
        >
          <MathElement
            inlineChildren={children_}
            element={element}
            format={"block-math"}
          />
          <span>{children}</span>
        </div>
      );
    case "inline-math":
      const inlineChildren = element.text_ ;
      return (
        <span {...attributes} contentEditable={false}>
          <MathElement
            inlineChildren={inlineChildren}
            element={element}
            format={"inline-math"}
          />
          <span>{children}</span>
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const MathElement = ({ inlineChildren, element, format }) => {
  const editor = useSlate();
  // const focuseed = useFocused();
  const selected = useSelected();

  const [inputValue, setInputValue] = useState(inlineChildren);

  const onInputChange = (e) => {
    const path = ReactEditor.findPath(editor, element)
    Transforms.setNodes(editor, { text_: e.target.value }, {at: path});
    setInputValue(e.target.value);
  };

  if (selected) {
    const inputUtility = ["border-2", "border-red-500", "px-2", "inline-block"];

    return (
      <span>
        <input
          autoFocus={true}
          type="text"
          value={inputValue}
          onChange={onInputChange}
          className={inputUtility.join(" ")}
        />
      </span>
    );
  } else {
    if (format === "inline-math") {
      return (
        <span contentEditable={false}>
          <InlineMath math={inlineChildren} />
        </span>
      );
    } else if (format === "block-math") {
      return (
        <div contentEditable={false}>
          <BlockMath math={inlineChildren} />
        </div>
      );
    }
  }
};
