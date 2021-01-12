import { MCQ } from "./";
import { RenderElementProps } from "slate-react";
import { SlateRenderElementProps } from "/home/nivekithan/work/memory/memory/src/type";
import { Node } from "slate";

export type MCQElementProps = {
  answer: "one" | "two" | "three" | "four";
  isEditable: true;
  one: Node[];
  two: Node[];
  three: Node[];
  four: Node[];
  question: Node[];
};

export const RenderMCQ = ({
  element,
  children,
  attributes,
}: SlateRenderElementProps<MCQElementProps>) => {
  const { data } = element;

  return (
    <div contentEditable="false" {...attributes}>
      <MCQ {...data} />
      {children}
    </div>
  );
};
