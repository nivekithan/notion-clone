import {useForm} from "react-hook-form";
import { FormsINT,  Utility} from "./";

// ------------------------------------------------------------
const utility : Utility = {
  "bg-rectangle": ["bg-myblue-400", "inline-block"],

  contentWrapperNew: [
    "w-box292",
    "h-box201",
    "mx-xl",
    "my-xxl",
    "flex",
    "flex-col",
  ],

  form: ["flex", "flex-col", "gap-6"],

  input: ["h-8", "rounded-md", "px-2"],

  submit: [
    "bg-black",
    "text-white",
    "rounded-md",
    "h-9",
    "text-xs",
    "uppercase",
    "font-serif",
    "font-bold",
    "tracking-submit",
    "cursor-pointer",
  ],

  cancelText: ["text-white", "font-serif", "font-xs", "font-bold"],
};

export const Form = ({ onCancel, onSubmit, defualtValue }: FormsINT) => {
    const { register, handleSubmit } = useForm({
      defaultValues: defualtValue,
    });
  
   
  
    return (
        <section className={utility.contentWrapperNew.join(" ")}>
          <form
            className={utility.form.join(" ")}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              ref={register({ required: true })}
              name="name"
              placeholder="Name"
              className={utility.input.join(" ")}
            />
            <input
              ref={register({ required: true })}
              name="tags"
              placeholder="Tags"
              className={utility.input.join(" ")}
            />
            <input
              type="submit"
              className={utility.submit.join(" ")}
              value="Submit"
            />
          </form>
          <button className={utility.cancelText.join(" ")} onClick={onCancel}>
            Cancel
          </button>
        </section>
    );
  };
  