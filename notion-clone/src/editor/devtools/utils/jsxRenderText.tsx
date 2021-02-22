import { ReactEditor, RenderLeafProps, useSlate } from "slate-react";
import React, { useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Node, Path } from "slate";
import useDeepCompareEffect from "use-deep-compare-effect";

export const JsxRenderText = ({
  attributes,
  text,
  setSelectedProperties,
  selectedProperties,
}: RenderLeafProps & {
  selectedProperties: { node: Node; path: Path } | null;
  setSelectedProperties: React.Dispatch<
    React.SetStateAction<{
      node: Node;
      path: Path;
    } | null>
  >;
}) => {
  const [shouldShowChildren, setShouldShowChildren] = useState<boolean>(false);
  const editor = useSlate();
  let { devtools_id, devtools_depth: depth } = text;
  const path = ReactEditor.findPath(editor, text);

  /*
    Update the selectedProperties with current node and path
  */
  useDeepCompareEffect(() => {
    /*
      if the selectedProperties is null do nothing
    */

    if (!selectedProperties) return;

    /*
      If selectedProperties devtools_id and element's devtools_id didnt match do nothing
    */

    if (selectedProperties.node.devtools_id !== devtools_id) return;

    /*
      Now update the selectedProperties with current version of element and path
    */

    setSelectedProperties({ node: text, path: path });

    /*
      For deepcomparing we wil ignore the children since the only way the see the effect when the children 
      is changed to select that childElement 
    */
  }, [path, devtools_id, { ...text, children: null }, selectedProperties]);

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
    setSelectedProperties({ node: text, path: path });
  };

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
