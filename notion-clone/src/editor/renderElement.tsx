import {
  Editable,
  ReactEditor,
  RenderElementProps,
  useSlate,
} from "slate-react";
import React, { ReactNode, useLayoutEffect, useState } from "react";
import { FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import TeX from "@matejmazur/react-katex";
import { Element, Node, Path, Transforms } from "slate";
import { SlateEditor } from "./slateEditor";
import { useEffect } from "react";

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
  
}: RenderElementProps): JSX.Element => {
  switch (element.type) {
    case "normal":
      return (
        <Common element={element} type="normal">
          <div {...attributes} className="text-normal">
            {children}
          </div>
        </Common>
      );
    case "heading-1":
      return (
        <Common element={element} type="heading-1">
          <h1 {...attributes} className="mt-8 mb-1 font-semibold text-heading1">
            {children}
          </h1>
        </Common>
      );
    case "heading-2":
      return (
        <Common element={element} type="heading-2">
          <h2
            {...attributes}
            className="mt-6 font-semibold mb-px1 text-heading2"
          >
            {children}
          </h2>
        </Common>
      );
    case "heading-3":
      return (
        <Common element={element} type="heading-3">
          <h3
            {...attributes}
            className="mt-4 font-semibold mb-px1 text-heading3"
          >
            {children}
          </h3>
        </Common>
      );
    case "unordered-list":
      return (
        <Common element={element} type="unordered-list">
          <ListItem slate={{ element, attributes, children }}>
            <span data-cy-label-icon={element.icon as string}>
              {icons[element.icon as string]}
            </span>
          </ListItem>
        </Common>
      );

    case "number-list":
      return (
        <Common element={element} type="number-list">
          <NumberList {...{ element, children, attributes }} />
        </Common>
      );

    default:
      return (
        <Common element={element} type="normal">
          <div {...attributes} className="text-normal">
            {children}
          </div>
        </Common>
      );
  }
};

/*
  Common component will contain style, logic common to all the compoenents
  this includes
          * Indenent using depth
          * Margin top 0.25rem
          * Maintaning Map which sets _id to path
  */

type Common = {
  element: Element;
  children: ReactNode;
  type: string;
};

const Common = ({ element, children,  type }: Common) => {
  const { depth, id } = element;
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);


  return (
    <div
      style={{
        marginLeft: typeof depth === "number" ? `${depth * 1.5}rem` : "0rem",
      }}
      className="mt-1"
      data-cy-type={type}
    >
      {children}
    </div>
  );
};

/**
   
  ListItem  extracts components and logic common to both numberes-list and 
  unordered-list and it requires a child element which will render
  label of the list. 
  Numbers in numbered-list is an example of label.
  **/
const ListItem = ({
  children,
  slate,
}: {
  children: React.ReactNode;
  slate: RenderElementProps;
}) => {

  
  return (
    <div {...slate.attributes} data-cy-label={slate.element.number ? slate.element.number : slate.element.icon} className="flex items-center gap-x-4 ">
      <div className="flex justify-end w-6" contentEditable={false}>
        {children}
      </div>
      <div className="text-normal">{slate.children}</div>
    </div>
  );
};

// Need for specific Function componenet for numbered-list unlike for
// unordered-list is for cleanup function

type NumberList = RenderElementProps;

const NumberList = ({ element, children, attributes }: NumberList) => {
  const { number, startId, id } = element;
  const editor = useSlate();

  useLayoutEffect(() => {
    return () => {
      if (typeof startId !== "string") {
        throw new Error("There is no startId");
      }

      SlateEditor.synNumber(editor, startId);
    };
  }, [id, startId, number]);
  return (
    <ListItem slate={{ element, children, attributes }}>
      <span data-cy-label-number={number}>{number}.</span>
    </ListItem>
  );
};
