import { RenderElementProps } from "slate-react";
import React from "react";

export const RenderElement = ({
  element: e,
  children,
  attributes,
}: RenderElementProps) => {
  switch (e.type) {
    case "list-wrapper":
      return (
        <ol {...attributes} style={{ listStyle: "decimal" }}>
          {children}
        </ol>
      );

    default:
        return (
            <li {...attributes} style={{ marginTop : "5px"}}><span style={{marginLeft : "10px",}}>{children}</span></li>
        )
  }
};
