import { Utility } from "./";

const utility: Utility = {
  popup: [
    "absolute",
    "bg-white",
    "top-0",
    "mt-20%",
    "ml-40%",
    "flex",
    "items-center",
    "justify-center",
    "rounded-xl",
    "shadow-lg",
  ],
  wrapper: ["flex", "flex-col", "gap-y-16", "my-4", "mx-16"],
  headerText: ["font-bold", "text-4xl", "px-2"],
  buttonWrapper: ["flex", "gap-x-2"],
  redButton: [
    "h-10",
    "w-120px",
    "bg-myred",
    "rounded-full",
    "text-white",
    "font-serif",
    "font-bold",
  ],
  blueButton: [
    "h-10",
    "w-120px",
    "bg-myblue-400",
    "rounded-full",
    "text-white",
    "font-serif",
    "font-bold",
  ],
};

export const DeleteConformation = () => {
  return (
    <section className={utility.popup.join(" ")}>
      <section className={utility.wrapper.join(" ")}>
        <span className={utility.headerText.join(" ")}>
          Will delete <br /> permanently
        </span>
        <section className={utility.buttonWrapper.join(" ")}>
          <button className={utility.redButton.join(" ")}>Delete</button>
          <button className={utility.blueButton.join(" ")}>Cancel</button>
        </section>
      </section>
    </section>
  );
};
