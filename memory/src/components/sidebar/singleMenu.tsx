import { MouseEvent } from "react";

// --------------------------------------------------------------------------------------------------
export type SingleMenuProps = {
  label: string;
  onMenuClick: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
};

const SINGLE_MENU = [
  "px-14-px",
  "pt-2-px",
  "cursor-pointer",
  "max-w-260",
  "truncate",
  "inline-block",
  "text-white-100",
  "font-medium",
  "tracking-wider",
  "bg-black-siderbar-normal",
  "hover:bg-black-sidebar-onHover",
  "text-sm",
  "inline-flex",
  "items-center",
];

export const SingleMenu = (props: SingleMenuProps) => {
  return (
    <section className={SINGLE_MENU.join(" ")} onClick={props.onMenuClick}>
      <span>{props.label}</span>
    </section>
  );
};
