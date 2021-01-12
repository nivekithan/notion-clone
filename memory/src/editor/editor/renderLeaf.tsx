import { RenderLeafProps } from "slate-react";

// --------------------------------------------------------------

export const RenderLeaf = (props: RenderLeafProps) => {
  return <span {...props.attributes} className="text-white-white" >{props.children}</span>;
};

// --------------------------------------------------------------
