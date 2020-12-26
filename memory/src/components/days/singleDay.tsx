import { Link } from "react-router-dom";
import {DaysINT, Utility, ButtonClick} from "./"
// ----------------------------------------------------------
export const SingleDay = ({
  onEditClick,
  day,
  onDeleteClick
}: {
  onEditClick: ButtonClick;
  onDeleteClick : ButtonClick
  day: DaysINT;
}) => {
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
    tagWrapper: ["h-box94", "overflow-y-auto"],
    text: ["text-white", "text-2xl", "font-bold", "font-serif"],
  };

  return (
    <section className={utility.sectionWrapper.join(" ")}>
      <ul className={utility.contentWrapper.join(" ")}>
        <li className={utility.text.join(" ")}>{day.name}</li>
        <li className={utility.tagWrapper.join(" ")}>
          <TagWrapper tags={day.tags} />
        </li>
        <li>
          <ButtonsWrapper onEditClick={onEditClick} dataKey={day._id} onDeleteClick={onDeleteClick} />
        </li>
      </ul>
    </section>
  );
};

// ------------------------------------------------------------------
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
      {tags.map((tag, index) => {
        return (
          <li className={utility.tag.join(" ")} key={index}>
            {tag}
          </li>
        );
      })}
    </ul>
  );
};

//-------------------------------------------------------------------------------------------------------------

const ButtonsWrapper = ({
  onEditClick,
  dataKey,
  onDeleteClick
}: {
  onEditClick: ButtonClick;
  dataKey: string;
  onDeleteClick : ButtonClick
}) => {
  const utility: Utility = {
    buttonWrapper: ["flex", "flex-row", "justify-between", "items-center"],
    buttonText: ["text-white", "text-10", "font-serif", "font-bold"],
  };
  
  return (
    <ul className={utility.buttonWrapper.join(" ")}>
      <li>
        <button className={utility.buttonText.join(" ")} onClick={onDeleteClick}>
          Delete
        </button>
      </li>
      <li>
        <Buttons onEditClick={onEditClick} dataKey={dataKey} />
      </li>
    </ul>
  );
};

const Buttons = ({
  onEditClick,
  dataKey,
}: {
  onEditClick: ButtonClick;
  dataKey: string;
}) => {
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
        <button className={utility.editButton.join(" ")} onClick={onEditClick}>
          Edit
        </button>{" "}
      </li>
      <li>
        <Link to={`/test/${dataKey}`}>
          <button className={utility.startButton.join(" ")}>Start</button>{" "}
        </Link>
      </li>
    </ul>
  );
};
