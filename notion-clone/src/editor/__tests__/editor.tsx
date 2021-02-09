/* eslint-disable no-undef */
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MainEditor } from "../index";
import { defaultValue } from "../../App";
import React from "react";

let newDefaultValue = defaultValue;

beforeEach(() => {
  newDefaultValue = defaultValue;
});

test("Testing normal Editor behaviour", () => {
 const {container, } = render(<MainEditor defaultValue={newDefaultValue} />);
  const textbox = screen.getByRole("textbox");
  userEvent.type(textbox, "Something is here {enter}");
  expect(textbox).toHaveTextContent("Something is here");
  screen.debug(container); 
}); 
