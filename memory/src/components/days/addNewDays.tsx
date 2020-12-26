import { HiOutlinePlusCircle } from "react-icons/hi";
import {Utility, ButtonClick} from "./"
// -------------------------------------------------------

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

export const AddNewDays = ({ onClick }: { onClick: ButtonClick }) => {
  return (
    <section className={utility["bg-rectangle"].join(" ")}>
      <section className={utility.contentWrapper.join(" ")}>
        <ul className={utility.textWrapper.join(" ")}>
          <li className={utility.text.join(" ")}>New Day</li>
          <button onClick={onClick}>
            <HiOutlinePlusCircle color={"#ffffff"} size="27px" />
          </button>
        </ul>
      </section>
    </section>
  );
};
