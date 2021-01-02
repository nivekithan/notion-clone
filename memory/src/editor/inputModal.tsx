import ReactDOM from "react-dom";
import React from "react";

// -----------------------------------------------------------------

export type InputModalProps = {
  defaultValue: string;
};

// -----------------------------------------------------------------
export const InputModal = React.forwardRef<HTMLDivElement, InputModalProps>(
  ({ defaultValue }, ref) => {
    return ReactDOM.createPortal(
      <div
        contentEditable
        suppressContentEditableWarning
        className="inline-block px-4 bg-black-sidebar-normal text-white-white"
        ref={ref}
      >
        {defaultValue}
      </div>,
      document.getElementById("modal") as HTMLElement
    );
  }
);
