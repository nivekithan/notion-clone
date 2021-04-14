import React, { useState } from "react";
import { SingleDropDown } from "./singleDropDown";

export const DropDown = () => {
  return (
    <div className="max-w-3/10">
      <SingleDropDown
        heading="Heading"
        iconLetter="N"
        subHeading="Subheading is really long"
        // active={activeDropDown === 1}
      />
      <SingleDropDown
        heading="Heading"
        iconLetter="I"
        subHeading="Subheading is really long"
        // active={activeDropDown === 2}
      />
      <SingleDropDown
        heading="Heading"
        iconLetter="V"
        subHeading="Subheading is really long"
        // active={activeDropDown === 3}
      />
      <SingleDropDown
        heading="Heading"
        iconLetter="E"
        subHeading="Subheading is really long"
        // active={activeDropDown === 4}
      />
    </div>
  );
};
