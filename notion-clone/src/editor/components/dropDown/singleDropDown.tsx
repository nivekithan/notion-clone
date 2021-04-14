import React from "react";

type SingleDropDownProps = {
  iconLetter: string;
  heading: string;
  subHeading: string;
};

export const SingleDropDown = ({
  iconLetter,
  heading,
  subHeading,
}: SingleDropDownProps) => {
  if (iconLetter.length > 1) {
    throw new Error("Icon letter has to be a single letter");
  }

  return (
    <button className="text-white p-2 flex gap-x-3 text-left hover:bg-hex-474c50">
      <div className="min-h-11.5 min-w-11.5 w-11.5 bg-teal-800 grid place-items-center rounded shadow-lg">
        {iconLetter}
      </div>
      <div className="flex flex-col w-full">
        <div className="text-xl truncate">{heading}</div>
        <div className="text-sm truncate text-gray-400">{subHeading}</div>
      </div>
    </button>
  );
};
