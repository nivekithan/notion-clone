import Tex from "@matejmazur/react-katex";
import {Node, Text} from "slate";

export const serialiser = (node: Node) : JSX.Element | JSX.Element[]=> {
  if (Text.isText(node)) {
    return Leaf(node);
  }
  const children = node.children.map((n) => serialiser(n) as JSX.Element) ;
  return Element(node, children );
  
};

const Element = (element : Node, children : JSX.Element[] ) => {
  switch (element.type) {
    case "section":
      return <section className={"default-text"}>{children}</section>;
    case "heading-1":
      return <h1 className={"heading-1"}>{children}</h1>;
    case "heading-3":
      return <h3 className={"heading-3"} >{children}</h3>;
    case "numbered-list":
      return <ol className={"numbered-list"}>{children}</ol>;
    case "unordered-list":
      return <ul className={"unordered-list"}>{children}</ul>;
    case "list-item":
      return <li className={"default-list"}>{children}</li>;
    case "block-math":
      return <Tex math={Node.string(element)} block />
    case "inline-math":
      return <Tex math={Node.string(element)}/>
    default:
      return children;
  }
};

const Leaf = (leaf : Text) => {
  const { text } = leaf;
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
    <span className={leafUtility.join(" ")}>{text}</span>
    );
};
