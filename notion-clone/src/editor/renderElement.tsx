import { Editable, RenderElementProps, useEditor, useSlate } from "slate-react";
import React, { ReactNode, useState } from "react";
import { FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import TeX from "@matejmazur/react-katex";
import { Element, Node } from "slate";
import { SlateEditor } from "./slateEditor";

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
        <Common element={element}>
          <div {...attributes} className="text-normal">
            {children}
          </div>
        </Common>
      );
    case "heading-1":
      return (
        <Common element={element}>
          <h1 {...attributes} className="mt-8 mb-1 font-semibold text-heading1">
            {children}
          </h1>
        </Common>
      );
    case "heading-2":
      return (
        <Common element={element}>
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
        <Common element={element}>
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
        <Common element={element}>
          <ListItem slate={{ element, attributes, children }}>
            <span>{icons[element.icon as string]}</span>
          </ListItem>
        </Common>
      );
    case "numbered-list":
      return (
        <Common element={element}>
          <NumberedList
            element={element}
            children={children}
            attributes={attributes}
          />
        </Common>
      );
    case "inline-math":
      return (
        <Common element={element}>
          <InlineMath
            attributes={attributes}
            children={children}
            element={element}
          />
        </Common>
      );
    default:
      return (
        <Common element={element}>
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
        * 
*/

const Common = ({
  element,
  children,
}: {
  element: Element;
  children: ReactNode;
}) => {
  const { depth } = element;

  if (typeof depth === "number") {
    return (
      <div style={{ marginLeft: `${depth * 1.5}rem` }} className="mt-1">
        {children}
      </div>
    );
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
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

const NumberedList = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  const editor = useSlate();
  const { _startId, _userDefined } = element;

  if (!(typeof _startId === "string")) {
    throw new Error("There is no _startId");
  } else if (!(typeof _userDefined === "boolean")) {
    throw new Error("There is no _userDefined");
  }
  // When the component gets unmounted the function will call synNumber
  // to syn the number
  React.useLayoutEffect(() => {
    return () => {
      SlateEditor.synNumber(editor, _startId, _userDefined);
    };
  }, []);

  return (
    <ListItem slate={{ element, attributes, children }}>
      <span>{element.number as number}.</span>
    </ListItem>
  );
};

// Inline Math
const InlineMath = ({ element, attributes, children }: RenderElementProps) => {
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
