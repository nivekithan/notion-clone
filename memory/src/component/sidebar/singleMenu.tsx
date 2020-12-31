import { MouseEvent } from "react";

// --------------------------------------------------------------------------------------------------
export type SingleMenuProps = {
  label: string;
  onMenuClick: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
};

const SINGLE_MENU = [
  "px-14-px",
  "py-2-px",
  "cursor-pointer",
  "max-w-260",
  "truncate",
  "inline-block",
  "text-white-100",
  "font-medium",
  "tracking-wider",
  "hover:bg-black-secondary",
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
