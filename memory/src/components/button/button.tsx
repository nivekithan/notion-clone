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
      className="grid px-3 text-sm font-medium shadow-button rounded-button h-7 bg-blue-primary hover:bg-blue-secondary place-items-center text-white-100 text-white-white"
    >
      {label}
    </button>
  );
};
