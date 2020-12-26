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
    case "numbered-list":
      return <ol className={"list-decimal list-outside"}>{children}</ol>;
    case "unordered-list":
      return <ul className={"list-disc list-outside"}>{children}</ul>;
    case "list-item":
      return <li className={"default-text"}>{children}</li>; 
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

