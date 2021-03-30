import { RenderElementProps } from "slate-react";
import {
  Heading1Element,
  Heading2Element,
  Heading3Element,
  ParagraphElement,
  TitleElement,
} from "./components";
import React from "react";

const RenderElementByTypes: {
  [i: string]: (props: RenderElementProps) => JSX.Element;
} = {
  title: TitleElement,
  paragraph: ParagraphElement,
  "heading-1": Heading1Element,
  "heading-2": Heading2Element,
  "heading-3": Heading3Element,
};

export const RenderElement = (props: RenderElementProps) => {
  if (typeof props.element.type !== "string") {
    return null;
  }

  const Element = RenderElementByTypes[props.element.type];

  return <Element {...props} />;
};
