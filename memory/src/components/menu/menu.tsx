import React from "react";

export type SingleOptionProps = {
  name: string;
  label: string;
  onOptionClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const SingleOption = ({
  name,
  label,
  onOptionClick,
}: SingleOptionProps) => {
  return (
    <div
      className="flex items-center py-1 shadow-input text-white-white text-normal min-h-menu hover:bg-black-sidebar-onHover"
      onClick={onOptionClick}
    >
      <div className="self-start inline-block mt-1-px min-h-menu min-w-menu shadow-button ml-14-px bg-black-sidebar-onHover"></div>
      <div className="flex-1 ml-2 mr-14-px">
        <div className="truncate">
          <div className="flex items-center">
            <span className="mr-1.5">{name}</span>
          </div>
        </div>
        <div className="mt-2-px turncate text-white-100 text-small">
          {label}
        </div>
      </div>
    </div>
  );
};
