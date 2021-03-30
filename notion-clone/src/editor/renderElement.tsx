import { RenderElementProps } from "slate-react";
import { ParagraphElement, TitleElement } from "./components";
import React from "react";

const RenderElementByTypes: {
  [i: string]: (props: RenderElementProps) => JSX.Element;
} = {
  title: TitleElement,
  paragraph: ParagraphElement,
};

export const RenderElement = (props: RenderElementProps) => {
  if (typeof props.element.type !== "string") {
    return null;
  }

  const Element = RenderElementByTypes[props.element.type];

  return <Element {...props} />;
};
