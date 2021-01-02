import ReactDOM from "react-dom";
import React from "react";

// -----------------------------------------------------------------

export type InputModalProps = {
  defaultValue: string;
  label : string
};

// -----------------------------------------------------------------
export const InputModal = React.forwardRef<HTMLDivElement, InputModalProps>(
  ({ defaultValue, label }, ref) => {
    return ReactDOM.createPortal(
      <div className="flex">
        <div
          contentEditable
          suppressContentEditableWarning
          className="px-4 bg-black-sidebar-normal text-white-white"
          ref={ref}
        >
          {defaultValue}
        </div>
        <div className="relative">
            <button className="btn-blue" >{label}</button>
        </div>
      </div>,
      document.getElementById("modal") as HTMLElement
    );
  }
);
