import { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

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
// ---------------------------------------------------------------------------------------------------
// Renders the days the component
export const Days: React.FC = () => {
  const [days, setDays] = useState<DaysINF[] | null>(null);

  useEffect(() => {
    (async () => {
      const url: string = "http://localhost:4000/get/days";
      setDays((await (await fetch(url)).json()).days);
    })();
  }, []);

  // tailwind utilites for the return element section
  const sectionUtility: string[] = [
    "grid",
    "grid-cols-3",
    "gap-x-4",
    "gap-y-6",
    "h-auto",
    "mx-28",
  ];

  const renderDays = days ? <DayCards days={days} /> : <h1> I am before</h1>;

  return <section className={sectionUtility.join(" ")}>{renderDays}</section>;
};
// ---------------------------------------------------------------------------

const DayCards = ({ days }: { days: DaysINF[] }) => {
  const sectionWrapperUtility: string[] = ["bg-green-500", "border-2"];
  const sectionHeadingUtility: string[] = [
    "flex",
    "justify-between",
    "items-center",
  ];
  const headingNameUtility: string[] = ["ml-6", "mt-9", "text-2xl"];

  const dayCards = days.map(
    (day: DaysINF): JSX.Element => {
      return (
        <section className={sectionWrapperUtility.join(" ")} key={day._id}>
          {/*This marks the starting of the header of DayCards */}
          <section className={sectionHeadingUtility.join(" ")}>
            <span className={headingNameUtility.join(" ")}>
              {day.name.charAt(0).toUpperCase() + day.name.slice(1)}
            </span>
            <StrictIcon />
          </section>
          {/* This marks the starting of tags */}
          <DayTagsWrapper day={day} />
          {/* This marks the starting of buttons*/}
          <Buttons />
        </section>
      );
    }
  );

  return (dayCards as any) as JSX.Element;
};

// -----------------------------------------------------------------------------
const StrictIcon = () => {
  const [isStrict, setStrict] = useState<boolean>(true);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setStrict((strict) => !strict);
  };
  const iconSize: string = "32px";
  return (
    <button onClick={handleButtonClick} className="mr-6 mt-9 ">
      {isStrict ? (
        <FaToggleOn size={iconSize} />
      ) : (
        <FaToggleOff size={iconSize} />
      )}
    </button>
  );
};
// -----------------------------------------------------------------------------------

const DayTagsWrapper = ({ day } : {day: DaysINF}) => {
  // Tailwind Utilites

  const daysTagsUtility : string[] = [
    "mx-6",
    "mt-9",
    "flex",
    "flex-wrap",
    "justify-start",
    "items-center",
  ];

  const dayTags = day.tags.map((tag, index) => {
    return <DayTags tag={tag} key={index} />;
  });

  return <li className={daysTagsUtility.join(" ")}>{dayTags}</li>;
};

// ------------------------------------------------------------------------------------
const DayTags = ({ tag }: {tag: string}) => {
  const listUtility : string[]= [
    "py-1",
    "px-4",
    "bg-red-500",
    "border",
    "rounded-3xl",
    "flex-none",
    "m-1",
    "text-sm",
    "cursor-pointer",
    "hover:bg-blue-500",
  ];

  return <ul className={listUtility.join(" ")}>{tag}</ul>;
};

// ---------------------------------------------------------------------------------------
const Buttons = (): JSX.Element => {
  const sectionUtility: String[] = ["mx-6", "my-9", "flex", "justify-between"];

  return (
    <section className={sectionUtility.join(" ")}>
      <button>Delete</button>
      <EditDelteButtons />
    </section>
  );
};

const EditDelteButtons = (): JSX.Element => {
  const sectionUtility: String[] = ["flex", "space-x-4"];
  const buttonUtility: String[] = ["w-28", "h-12", "border-2"];

  return (
    <section className={sectionUtility.join(" ")}>
      <button className={buttonUtility.join(" ")}>Edit</button>
      <button className={buttonUtility.join(" ")}>Start</button>
    </section>
  );
};


// ---------------------------------------------------------------------------------
