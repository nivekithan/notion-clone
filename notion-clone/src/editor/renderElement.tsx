import { RenderElementProps } from "slate-react";
import React from "react";

export const RenderElement = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  switch (element.type) {
    case "normal":
      return (
        <div {...attributes} className="text-normal">
          {children}
        </div>
      );
    case "heading-1":
      return (
        <h1 {...attributes} className="mt-8 mb-1 font-semibold text-heading1">
          {children}
        </h1>
      );
    case "heading-2":
      return (
        <h2 {...attributes} className="mt-6 font-semibold mb-px1 text-heading2">
          {children}
        </h2>
      );
    case "heading-3":
      return (
        <h3 {...attributes} className="mt-4 font-semibold mb-px1 text-heading3">
          {children}
        </h3>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "number-list":
        return <ol {...attributes}>{children}</ol>
    case "bullet-list":
        return <ul {...attributes}>{children}</ul>
    default:
      return (
        <div {...attributes} className="text-normal">
          {children}
        </div>
      );
  }
};
