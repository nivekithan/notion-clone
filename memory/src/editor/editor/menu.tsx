import { Menu } from "src/components/menu";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { options } from "./options";
// -------------------------------------------------------------

export type SlateMenuProps = {
  shouldShow: boolean;
  queryString: string;
};

// -------------------------------------------------------------

export const SlateMenu = ({ shouldShow, queryString }: SlateMenuProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    if (!shouldShow) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection() as Selection;
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return createPortal(
    <div
      ref={ref}
      className="absolute w-12 opacity-0 -top-outside -left-outside"
    >
      <Menu maxOption={4} options={options} queryString={queryString} />
    </div>,
    document.body
  );
};

// -------------------------------------------------------------
