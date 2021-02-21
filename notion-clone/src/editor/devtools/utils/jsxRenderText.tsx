import { ReactEditor, RenderLeafProps, useSlate } from "slate-react";
import React, { useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Node, Path } from "slate";

export const JsxRenderText = ({
  attributes,
  text,
  setSelectedProperties,
}: RenderLeafProps & {
  setSelectedProperties: React.Dispatch<React.SetStateAction<{
    node: Node;
    path: Path;
} | null>>
}) => {
  const [shouldShowChildren, setShouldShowChildren] = useState<boolean>(false);
  const editor = useSlate();
  const Icon = () => {
    return (
      <span>
        {shouldShowChildren ? <BsArrowDownShort /> : <BsArrowUpShort />}
      </span>
    );
  };

  const onIconClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setShouldShowChildren((s) => !s);
  };

  const onJsxClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    const path = ReactEditor.findPath(editor, text);
    setSelectedProperties({node : text, path : path });
  };

  let { devtools_depth: depth } = text;

  if (typeof depth !== "number") {
    depth = 0;
  }

  return (
    <div {...attributes}>
      <div
        style={{ display: "flex", marginLeft: `${(depth as number) * 1.5}rem` }}
      >
        <span onClick={onIconClick} style={{ cursor: "pointer" }}>
          <Icon />
        </span>
        <span onClick={onJsxClick}>{"<Text />"}</span>
      </div>
      <div style={{ marginLeft: `${((depth as number) + 1) * 1.5}rem` }}>
        {shouldShowChildren ? `"${text.text}"` : null}
      </div>
    </div>
  );
};
