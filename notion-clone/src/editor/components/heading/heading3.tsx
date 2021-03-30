import React from "react";
import { Element, Node } from "slate";
import { RenderElementProps } from "slate-react";

type Heading3Element = {
  type: "heading-3";
  children: Node[];
};

const isHeading3Element = (ele: Element): ele is Heading3Element => {
  return ele.type === "heading-3";
};

export const Heading3Element = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  if (!isHeading3Element(element)) {
    throw new Error("The element is not of type heading-3 Element");
  }

  return (
    <div {...attributes} className="text-xl font-semibold my-4">
      {children}
    </div>
  );
};
