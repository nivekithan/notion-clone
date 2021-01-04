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
    console.log(data)
  };

  return (
    <div className="flex flex-col text-white-white gap-y-12">
      <div>{question}</div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <label>
          <input type="radio" name="question" value={one} ref={register} className="mr-2" />
          {one}
        </label>
        <label>
          <input type="radio" name="question" value={two} ref={register} className="mr-2" />
          {two}
        </label>
        <label>
          <input type="radio" name="question" value={three} ref={register} className="mr-2" />
          {three}
        </label>
        <label>
          <input type="radio" name="question" value={four} ref={register} className="mr-2" />
          {four}  
        </label>
        <input type="submit" className="btn-blue" />
      </form>
    </div>
  );
};
