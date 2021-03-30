import React from "react";
import { Element, Node } from "slate";
import { RenderElementProps } from "slate-react";

type Heading1Element = {
  type: "heading-1";
  children: Node[];
};

const isHeading1Element = (ele: Element): ele is Heading1Element => {
  return ele.type === "heading-1";
};

export const Heading1Element = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  if (!isHeading1Element(element)) {
    throw new Error("The element is not of type heading-1 Element");
  }

  return (
    <div {...attributes} className="text-4xl font-semibold my-6">
      {children}
    </div>
  );
};
