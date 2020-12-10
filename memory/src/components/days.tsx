import { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { HiOutlinePlusCircle } from "react-icons/hi";

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

  const utility = {
    section: ["mx-10%"],
  };

  return (
    <section className={utility.section.join(" ")}>
      <AddNewDays />
    </section>
  );
};
// ---------------------------------------------------------------------------

const AddNewDays = () => {
  const utility  = {
    "bg-rectangle": [
      "bg-myblue-400",
      "w-box340",
      "h-box273",
      "flex",
      "items-center",
      "justify-center",
    ],
    spanText: ["text-4xl", "text-white", "font-serif"],
    headerText: ["flex", "flex-col", "items-center", "gap-y-4"],
  };

  return (
    <section className={utility["bg-rectangle"].join(" ")}>
      <div className={utility["headerText"].join(" ")}>
        <div className={utility["spanText"].join(" ")}>New Day</div>
        <HiOutlinePlusCircle color="#ffffff" size="27px" />
      </div>
    </section>
  );
};
