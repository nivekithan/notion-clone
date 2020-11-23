import { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const _renderDayCards = (days) => {
  let dayCards = [];

  const handleButtonClick = (e, i) => {
    e.preventDefault();
    console.dir(e.target.attributes.getNamedItem("data-key").value);
    console.dir(e.target.attributes);
  };

  const sectionUtility = ["bg-green-500", "border-2"];
  const buttonUtility = ["bg-green-500", "text-purple-600"];

  for (let i = 1; i <= days.length; i++) {
    const cards = (
      <section className={sectionUtility.join(" ")} key={days[i - 1]._id}>
        <section className="flex justify-between items-center">
          <span className="">{days[i - 1].name}</span>
          <FaToggleOn />
        </section>
      </section>
    );

    dayCards.push(cards);
  }

  return dayCards;
};

// Renders the days the component
export const Days = () => {
  const [renderButtons, setRenderButtons] = useState(null);

  useEffect(() => {
    (async () => {
      const url = "http://localhost:4000/get/days";
      const { days } = await (await fetch(url)).json();
      setRenderButtons(_renderDayCards(days));
    })();
  }, []);

  // tailwind utilites for the return element section
  const sectionUtility = [
    "grid",
    "grid-cols-3",
    "gap-x-4",
    "gap-y-6",
    "h-auto",
  ];

  return (
    <section className={sectionUtility.join(" ")}>{renderButtons}</section>
  );
};
