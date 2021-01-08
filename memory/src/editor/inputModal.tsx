import ReactDOM from "react-dom";
import React from "react";

// -----------------------------------------------------------------

export type InputModalProps = {
  defaultValue: string;
  label: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// -----------------------------------------------------------------
export const InputModal = React.forwardRef<HTMLDivElement, InputModalProps>(
  ({ defaultValue, label, onButtonClick }, ref) => {
    return (
      <div className="flex flex-col overflow-hidden bg-black-input-normal shadow-input w-400-px rounded-3-px">
        <div className="flex items-center w-full px-2 py-10-px">
          <div
            contentEditable
            suppressContentEditableWarning
            className="flex-1 mr-2 break-all outline-none text-white-white"
            ref={ref}
          >
            {defaultValue}
          </div>
          <button className="self-start btn-blue" onClick={onButtonClick}>
            {label}
          </button>
        </div>
      </div>
    );
  }
);
