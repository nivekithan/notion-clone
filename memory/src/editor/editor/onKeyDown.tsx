import React from "react";

const MENU_STATE_FALSE = ["/"];
const MENU_STATE_TRUE = [" ", "Enter"];

export const onKeyDown = (
  e: React.KeyboardEvent<HTMLDivElement>,
  menuState: boolean,
  setMenuState: React.Dispatch<
    React.SetStateAction<{
      menuShould: boolean;
      menuQuery: string | "DEFAULT";
    }>
  >
) => {
  if (!menuState) {
    if (!MENU_STATE_FALSE.includes(e.key)) return;

    switch (e.key) {
      case "/":
        setMenuState((s) => {
          return {
            ...s,
            menuShould: true,
          };
        });
    }
  } else {
    if (MENU_STATE_TRUE.includes(e.key)) {
      setMenuState((s) => {
        return {
          menuQuery: "",
          menuShould: false,
        };
      });

      if (e.key === "Enter") {
        e.preventDefault();
        return;
      }

      return;
    }

    if (e.key === "Backspace") {
      setMenuState((s) => {
        const currentQuery = s.menuQuery;

        return {
          ...s,
          menuQuery: currentQuery.slice(0, currentQuery.length - 1),
        };
      });
      return;
    }

    setMenuState((s) => {
      const currentQuery = s.menuQuery;
      return {
        ...s,
        menuQuery: currentQuery + e.key,
      };
    });
  }
};
