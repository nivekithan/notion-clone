import { RenderElementProps, useSlate } from "slate-react";
import React, { useState } from "react";
import { FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import TeX from "@matejmazur/react-katex";
import { Node } from "slate";

type iconsType = {
  [index: string]: JSX.Element;
};

const icons: iconsType = {
  bullet: <FaCircle size={"0.5rem"} />,
  arrow: <FaLongArrowAltRight />,
};

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
    case "unordered-list":
      return (
        <ListItem slate={{ element, attributes, children }}>
          <span>{icons[element.icon as string]}</span>
        </ListItem>
      );
    case "numbered-list":
      return (
        <ListItem slate={{ element, attributes, children }}>
          <span>{element.number as number}.</span>
        </ListItem>
      );
    case "inline-math":
      return (
        <InlineMath attributes={attributes} children={children} element={element} />
      )
    default:
      return (
        <div {...attributes} className="text-normal">
          {children}
        </div>
      );
  }
};
/**
 
ListItem  extracts components common to both numberes-list and 
unordered-list and it requires a child element which will render
label of the list. 

Numbers in numbered-list and bullet in unordered-list are examples of label in list

**/
const ListItem = ({
  children,
  slate,
}: {
  children: React.ReactNode;
  slate: RenderElementProps;
}) => {
  return (
    <div {...slate.attributes} className="flex items-center gap-x-4 ">
      <div className="flex justify-end w-6" contentEditable={false}>
        {children}
      </div>
      <div className="text-normal">{slate.children}</div>
    </div>
  );
};

// Inline Math
const InlineMath = ({ element, attributes, children }: RenderElementProps) => {

  console.log("I am here")

  const [isModal, setIsModal] = useState<boolean>(false);
  const mathString = Node.string(element);

  return (
    <span
      {...attributes}
      contentEditable={false}
      onClick={(e) => {
        e.preventDefault();
        setIsModal((s) => !s);
      }}
    >
      <span>{children}</span>
      <span>
        <TeX math={mathString} />
      </span>
      {isModal ? <span>Modal is showing</span> : null}
    </span>
  );
};
