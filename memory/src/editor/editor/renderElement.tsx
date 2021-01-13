import React, { useState } from "react";
import { RenderMCQ } from "../questions";
// --------------------------------------------------------------
import { BsPlus, BsGridFill } from "react-icons/bs";
// --------------------------------------------------------------
import { SlateRenderElementProps } from "type";
// --------------------------------------------------------------
export const RenderElement = (props: SlateRenderElementProps<any>) => {
  switch (props.element.type) {
    case "normal":
      return (
        <CreateMenu>
          <div {...props.attributes} className="mt-4">
            {props.children}
          </div>
        </CreateMenu>
      );
    case "mcq":
      return (
        <CreateMenu>
          <RenderMCQ {...props} />
        </CreateMenu>
      );
    default:
      return (
        <CreateMenu>
          <div {...props.attributes} className="mt-4">
            {props.children}
          </div>
        </CreateMenu>
      );
  }
};
// --------------------------------------------------------------

type CreateMenuProps = {
  children: React.ReactNode;
};

// --------------------------------------------------------------

const CreateMenu = ({ children }: CreateMenuProps) => {
  const [isMenuShowing, setIsMenuShowing] = useState<boolean>(false);

  const onMouseInside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsMenuShowing(true);
  };

  const onMouseOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsMenuShowing(false);
  };

  if (isMenuShowing) {
    return (
      <div onMouseLeave={onMouseOutside} className="relative">
        {children}

        <div className="absolute top-0 flex pr-10 -left-10">
          <BsPlus />
          <BsGridFill />
        </div>
      </div>
    );
  }

  return <div onMouseEnter={onMouseInside}>{children}</div>;
};
