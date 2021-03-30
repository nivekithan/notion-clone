import React from "react";
import { Element, Node } from "slate";
import { RenderElementProps } from "slate-react";

type ParagraphElement = {
  type: "paragraph";
  children: Node[];
};

const isParagraphElement = (ele: Element): ele is ParagraphElement => {
  return ele.type === "paragraph";
};

export const ParagraphElement = ({
  children,
  attributes,
  element,
}: RenderElementProps) => {
  if (!isParagraphElement(element))
    throw new Error("The element is not of type Paragraph Element");

  return (
    <div {...attributes} className="text-base">
      {children}
    </div>
  );
};
