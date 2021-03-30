import React from "react";
import { Element, Node } from "slate";
import { RenderElementProps } from "slate-react";

type TitleElement = {
  type: "title";
  children: Node[];
};

const isTitleElement = (ele: Element): ele is TitleElement => {
  return ele.type === "title";
};

export const TitleElement = ({
  element,
  attributes,
  children,
}: RenderElementProps) => {
  if (!isTitleElement(element)) {
    throw new Error("The element is not type of Title Element");
  }

  return (
    <div {...attributes} className="text-5xl font-bold mt-4 mb-12">
      {children}
    </div>
  );
};
