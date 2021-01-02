import { useState, MouseEvent, FormEvent, useRef } from "react";
import { Button } from "../button/button";
import ContentEditable from "react-contenteditable";
// -------------------------------------
export type InputProps = {
  defaultValue: string;
  placeholder: string;
  onButtonClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
};

// --------------------------------------
export const Input = (props: InputProps) => {
  const { defaultValue, onButtonClick, placeholder } = props;
  const editable = useRef();

  const onContentChange: (e: FormEvent<HTMLTextAreaElement>) => void = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <div>
        <Button label="done" onButtonClick={onButtonClick} />
      </div>
    </div>
  );
};
