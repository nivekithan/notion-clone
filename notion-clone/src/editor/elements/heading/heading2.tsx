import React from "react";
import { Element, Node } from "slate";
import { RenderElementProps } from "slate-react";

type Heading2Element = {
  type: "heading-2";
  children: Node[];
};

const isHeading2Element = (ele: Element): ele is Heading2Element => {
  return ele.type === "heading-2";
};

export const Heading2Element = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  if (!isHeading2Element(element)) {
    throw new Error("The element is not of type heading-2 Element");
  }

  return (
    <div {...attributes} className="text-2xl font-semibold my-6">
      {children}
    </div>
  );
};
