import { useState, useEffect } from "react";

const _renderDayCards = (days) => {
  let dayCards = [];

  const buttonUtility = ["bg-green-500", "text-purple-600"];

  for (let i = 1; i <= days.length; i++) {
    const buttons = (
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(days[i - 1]._id);
        }}
        key={days[i - 1]._id}
        className={buttonUtility.join(" ")}
      >
        {i}
      </button>
    );

    dayCards.push(buttons);
  }

  return dayCards;
};

export const Days = () => {
  const [renderButtons, setRenderButtons] = useState(null);

  useEffect(() => {
    (async () => {
      const url = "http://localhost:4000/get/days";
      const { days } = await (await fetch(url)).json();
      setRenderButtons(_renderDayCards(days));
    })();
  }, []);

  return <div>{renderButtons}</div>;
};
