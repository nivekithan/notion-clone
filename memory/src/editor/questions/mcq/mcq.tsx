import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InlineEditor } from "../../inline-editor";
// -------------------------------------------------------------------

export type MCQProps = {
  question: string;
  one: string;
  two: string;
  three: string;
  four: string;
  answer: "one" | "two" | "three" | "four";
};

type FormValue = {
  [index: string]: boolean;
};

// -------------------------------------------------------------------

export const MCQ = (props: MCQProps) => {
  const { question, one, two, three, four, answer } = props;
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const noAnswer = { one: false, two: false, three: false, four: false };
    console.log(data)
    if ({ ...noAnswer, [answer]: true } === data) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  return (
    <div className="flex flex-col text-white-white">
      <div>{question}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input type="checkbox" name="one" ref={register} />
          {one}
        </label>
        <label>
          <input type="checkbox" name="two" ref={register} />
          {two}
        </label>
        <label>
          <input type="checkbox" name="three" ref={register} />
          {three}
        </label>
        <label>
          <input type="checkbox" name="four" ref={register} />
          {four}  
        </label>
        <input type="submit" className="btn-blue" />
      </form>
    </div>
  );
};
