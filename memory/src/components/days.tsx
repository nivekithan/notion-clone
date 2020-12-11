import { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Fragment } from "react";
// This element is child element for DayCards Element
//
// allows the user to start the test is strict mode or in not in strict strict mode
// by default it will start in strict mode

// -----------------------------------------------------------------------------------------------

interface DaysINF {
  tags: string[];
  _id: string;
  name: string;
  group_id: string;
}

interface Utility {
  [index: string]: string[];
}
// ---------------------------------------------------------------------------------------------------
// Renders the days the component
export const Days = () => {
  const [days, setDays] = useState<DaysINF[] | null>(null);

  useEffect(() => {
    (async () => {
      const url: string = "http://localhost:4000/get/days";
      setDays((await (await fetch(url)).json()).days);
    })();
  }, []);

  const utility: Utility = {
    section: ["mx-10%", "flex", "flex-wrap", "gap-9"],
  };

  const output = days ? (
    <section className={utility.section.join(" ")}>
      <AddNewDays />
      <Day days={days} />
    </section>
  ) : (
    <h1>I am before</h1>
  );

  return <section>{output}</section>;
};
// ---------------------------------------------------------------------------

const AddNewDays = () => {
  const utility: Utility = {
    "bg-rectangle": ["bg-myblue-400", "inline-block"],
    contentWrapper: [
      "w-box292",
      "h-box201",
      "mx-xl",
      "my-xxl",
      "flex",
      "justify-center",
      "items-center",
    ],
    textWrapper: ["flex", "flex-col", "items-center", "gap-y-4"],
    text: ["text-white", "text-4xl", "font-serif", "font-bold"],
  };

  return (
    <section className={utility["bg-rectangle"].join(" ")}>
      <section className={utility.contentWrapper.join(" ")}>
        <ul className={utility.textWrapper.join(" ")}>
          <li className={utility.text.join(" ")}>New Day</li>
          <HiOutlinePlusCircle color={"#ffffff"} size="27px" />
        </ul>
      </section>
    </section>
  );
};

// ---------------------------------------------------------\

const Day = ({ days }: { days: DaysINF[] }) => {
  const utility: Utility = {
    sectionWrapper: ["w-box340", "bg-mygrey-400", "inline-block"],
    contentWrapper: [
      "w-box292",
      "h-box201",
      "mx-xl",
      "my-xxl",
      "gap-y-6",
      "flex",
      "flex-col",
    ],
    tagWrapper: ["h-box94", "overflow-hidden"],
    text: ["text-white", "text-2xl", "font-bold", "font-serif"],
  };

  const output = days.map((day, index) => {
    return (
      <section className={utility.sectionWrapper.join(" ")} key={index}>
        <ul className={utility.contentWrapper.join(" ")}>
          <li className={utility.text.join(" ")}>{day.name}</li>
          <li className={utility.tagWrapper.join(" ")}>
            <TagWrapper tags={day.tags} />
          </li>
          <li>
            <ButtonsWrapper />
          </li>
        </ul>
      </section>
    );
  });
  return <Fragment>{output}</Fragment>;
};
//----------------------------------------------------------------------------------------------------
const TagWrapper = ({ tags }: { tags: string[] }) => {
  const utility: Utility = {
    tagWrapper: ["flex", "flex-wrap", "gap-2"],
    tag: [
      "text-black",
      "px-4",
      "py-1.5",
      "rounded-full",
      "bg-white",
      "font-bold",
      "font-serif",
      "text-xs",
      "flex-none",
    ],
  };

  return (
    <ul className={utility.tagWrapper.join(" ")}>
      {tags.map((tag) => {
        return <li className={utility.tag.join(" ")}>{tag}</li>;
      })}
    </ul>
  );
};

//-------------------------------------------------------------------------------------------------------------

const ButtonsWrapper = () => {
  const utility: Utility = {
    buttonWrapper: ["flex", "flex-row", "justify-between", "items-center"],
    buttonText: ["text-white", "text-10", "font-serif", "font-bold"],
  };

  return (
    <ul className={utility.buttonWrapper.join(" ")}>
      <li>
        <button className={utility.buttonText.join(" ")}>Delete</button>
      </li>
      <li>
        <Buttons />
      </li>
    </ul>
  );
};

const Buttons = () => {
  const utility: Utility = {
    buttonWrapper: ["flex", "flex-row", "gap-x-3", "items-center"],
    editButton: ["text-white", "text-sm", "font-serif", "font-bold"],
    startButton: [
      "text-white",
      "text-xs",
      "w-20",
      "bg-myblue-400",
      "rounded-full",
      "py-2.5",
      "font-bold",
    ],
  };

  return (
    <ul className={utility.buttonWrapper.join(" ")}>
      <li>
        <button className={utility.editButton.join(" ")}>Edit</button>{" "}
      </li>
      <li>
        <button className={utility.startButton.join(" ")}>Start</button>{" "}
      </li>
    </ul>
  );
};
