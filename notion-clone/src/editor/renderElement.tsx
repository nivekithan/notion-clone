import {
    ReactEditor,
    RenderElementProps,
    useSlate,
  } from "slate-react";
  import React, { ReactNode, useState } from "react";
  import { FaCircle, FaLongArrowAltRight } from "react-icons/fa";
  import TeX from "@matejmazur/react-katex";
  import { Element, Node, Path } from "slate";
  
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
    ID_TO_PATH,
  }: RenderElementProps & { ID_TO_PATH: Map<string, Path> }): JSX.Element => {
    switch (element.type) {
      case "normal":
        return (
          <Common element={element} ID_TO_PATH={ID_TO_PATH}>
            <div {...attributes} className="text-normal">
              {children}
            </div>
          </Common>
        );
      case "heading-1":
        return (
          <Common element={element} ID_TO_PATH={ID_TO_PATH}>
            <h1 {...attributes} className="mt-8 mb-1 font-semibold text-heading1">
              {children}
            </h1>
          </Common>
        );
      case "heading-2":
        return (
          <Common element={element} ID_TO_PATH={ID_TO_PATH}>
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
          <Common element={element} ID_TO_PATH={ID_TO_PATH}>
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
          <Common element={element} ID_TO_PATH={ID_TO_PATH}>
            <ListItem slate={{ element, attributes, children }}>
              <span>{icons[element.icon as string]}</span>
            </ListItem>
          </Common>
        );
      default:
        return (
          <Common element={element} ID_TO_PATH={ID_TO_PATH}>
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
  
  const Common = ({
    element,
    children,
    ID_TO_PATH,
  }: {
    element: Element;
    children: ReactNode;
    ID_TO_PATH: Map<string, Path>;
  }) => {
    const { depth, _id } = element;
    const editor = useSlate();
    const path = ReactEditor.findPath(editor, element);
  
    React.useLayoutEffect(() => {
      ID_TO_PATH.set(_id + "", path);
      return () => {
        ID_TO_PATH.delete(_id + "");
      };
    }, [path, _id, ID_TO_PATH]);
  
    return (
      <div
        style={{
          marginLeft: typeof depth === "number" ? `${depth * 1.5}rem` : "0rem",
        }}
        className="mt-1"
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
      <div {...slate.attributes} className="flex items-center gap-x-4 ">
        <div className="flex justify-end w-6" contentEditable={false}>
          {children}
        </div>
        <div className="text-normal">{slate.children}</div>
      </div>
    );
  };
  
  // Need for specific Function componenet for numbered-list unlike for
  // unordered-list is for cleanup function
  
  