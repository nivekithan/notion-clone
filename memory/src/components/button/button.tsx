import { MouseEvent } from "react";

export type ButtonProps = {
  label: "done" | "Submit";
  onButtonClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
};

export const Button = ({ label, onButtonClick }: ButtonProps) => {
  return (
    <button
      onClick={onButtonClick}
      className="btn-blue"
    >
      {label}
    </button>
  );
};
