import React, { useEffect, useRef } from "react";

export function useOuterClick<T extends HTMLElement>(
  callback: (e: MouseEvent) => void
) {
  const elementRef = useRef<T | null>(null);

  const onMouseDown = (e: MouseEvent) => {
    if (!elementRef.current) return;

    const mouseClickX = e.clientX;
    const mouseClickY = e.clientY;

    const eleRect = elementRef.current.getBoundingClientRect();
    const eleLeft = eleRect.left;
    const eleRight = eleRect.width + eleLeft;
    const eleTop = eleRect.top;
    const eleBottom = eleRect.height + eleTop;

    if (
      !(mouseClickX > eleLeft && 
      mouseClickX < eleRight &&
      mouseClickY > eleTop &&
      mouseClickY < eleBottom
      )
    ) {
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);
  
  return elementRef;
}
