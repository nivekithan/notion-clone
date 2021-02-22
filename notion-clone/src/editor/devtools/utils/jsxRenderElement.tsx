import { RenderElementProps, ReactEditor, useSlate } from "slate-react";
import React, { useState } from "react";
import { BsAlarm, BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Node, Path } from "slate";
import useDeepCompareEffect from "use-deep-compare-effect";

export const JsxRenderElement = ({
  attributes,
  children: slateChildren,
  element,
  setSelectedProperties,
  selectedProperties,
}: RenderElementProps & {
  setSelectedProperties: React.Dispatch<
    React.SetStateAction<{
      node: Node;
      path: Path;
    } | null>
  >;
  selectedProperties: { node: Node; path: Path } | null;
}) => {
  let { type, devtools_depth, devtools_id } = element;
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);
  // Updating the selctedProperties everytime the value of element changes
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

    setSelectedProperties({ node: element, path: path });

    /*
      For deepcomparing we wil ignore the children since the only way the see the effect when the children 
      is changed to select that childElement 
    */
  }, [path, devtools_id, { ...element, children: null }, selectedProperties]);

  const [showChildren, setShowChildren] = useState<boolean>(false);
  const Icon = () => {
    return showChildren ? (
      <span>{<BsArrowDownShort />}</span>
    ) : (
      <span>{<BsArrowUpShort />}</span>
    );
  };

  const onIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setShowChildren((s) => !s);
  };

  const onJsxClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setSelectedProperties({ node: element, path: path });
  };

  if (typeof type !== "string") {
    type = "normal";
  }

  if (typeof devtools_depth !== "number") {
    devtools_depth = 0;
  }

  return (
    <div
      {...attributes}
      style={{ marginLeft: `${(devtools_depth as number) * 1.5}rem` }}
    >
      <div style={{ display: "flex" }}>
        <span onClick={onIconClick} style={{ cursor: "pointer" }}>
          <Icon />
        </span>
        <span onClick={onJsxClick}>{`<${type} />`}</span>
      </div>

      {showChildren ? slateChildren : null}
    </div>
  );
};
