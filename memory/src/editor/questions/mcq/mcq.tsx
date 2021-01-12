import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { CheckButton, AnswerButton } from "../../../components/button/";
import React, { useState } from "react";
import { Node } from "slate";
import { SerialiseInlineEditor, InlineEditor } from "../../inline-editor/";

// -------------------------------------------------------------------

type Choices = "one" | "two" | "three" | "four";

export type MCQProps = {
  question: Node[];
  one: Node[];
  two: Node[];
  three: Node[];
  four: Node[];
  answer: Choices;
  isEditable: boolean;
};

type FormValues = {
  [name: string]: Choices;
};
// -------------------------------------------------------------------

export const MCQ = (props: MCQProps) => {
  const { question, one, two, three, four } = props;
  const name = "question";
  const { register, watch, setValue, handleSubmit } = useForm<FormValues>();

  // toggling the state will allow the user to edit the
  // content of choices, Questions and answers of the MCQ
  const [isEditable, setIsEditable] = useState<boolean>(props.isEditable);

  // Stores state of Answer
  const [ans, setAns] = useState<Choices>(props.answer);
  const watchQuestion = watch(name);

  // This function enables the radio behaviour to the custom
  // checkbutton
  const onCheckClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: Choices
  ) => {
    e.preventDefault();
    setValue(name, value, { shouldDirty: true });
  };

  // This function toggles the isEditable
  //
  // It also saves the answer if answer is changed and
  // isEditable is true
  const onEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!(props.answer === ans) && isEditable) {
      console.log(ans); // Replace with api call
    }

    setIsEditable((s) => !s);
  };

  // This function checkes if the checked radio is answer or not and then
  // does some function. This function do nothing if isEditable is set to
  // true
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    if (isEditable) return;

    if (data[name] === props.answer) {
      console.log({ answer: data[name] }); // Replace with api call
    } else {
      console.log({ "not answer": data[name] }); // Relpace with api call
    }
  };

  return (
    <div className="flex flex-col text-white-white gap-y-12">
      <div className="flex">
        <span className="flex-1 break-all">
          {isEditable ? (
            <InlineEditor defaultValue={question} />
          ) : (
            <SerialiseInlineEditor node={{ children: question }} />
          )}
        </span>
        <button className="self-start btn-blue" onClick={onEditClick}>
          {isEditable ? "Save" : "Edit"}
        </button>
      </div>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"one"}
          label={one}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
          isAnswer={ans === "one"}
          setAns={setAns}
        />
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"two"}
          label={two}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
          isAnswer={ans === "two"}
          setAns={setAns}
        />
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"three"}
          label={three}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
          isAnswer={ans === "three"}
          setAns={setAns}
        />
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"four"}
          label={four}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
          isAnswer={ans === "four"}
          setAns={setAns}
        />
        <span>
          <input type="submit" className="mt-2 btn-blue" />
        </span>
      </form>
    </div>
  );
};
// -------------------------------------------------------------------

type SingleOptionProps = {
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: Choices
  ) => void;
  name: string;
  value: Choices;
  label: Node[];
  register: (e: HTMLInputElement, options?: RegisterOptions) => void;
  watchQuestion: any;
  isEditable: boolean;
  isAnswer: boolean;
  setAns: React.Dispatch<React.SetStateAction<Choices>>;
};
// -------------------------------------------------------------------

const SingleOption = (props: SingleOptionProps) => {
  return (
    <div className="flex flex-row gap-x-2">
      {props.isEditable ? (
        <AnswerButton
          isAnswer={props.isAnswer}
          onClick={(e) => {
            e.preventDefault();
            props.setAns(props.value);
          }}
        />
      ) : (
        <CheckButton
          checked={!!(props.watchQuestion === props.value)}
          onClick={(e) => props.onClick(e, props.value)}
        />
      )}
      <input
        type="radio"
        name={props.name}
        value={props.value}
        id={props.value}
        ref={(e) => props.register(e as HTMLInputElement)}
        className="fixed opacity-0 pointer-events-none"
      />

      {props.isEditable ? (
        <InlineEditor defaultValue={props.label} />
      ) : (
        <label htmlFor={props.value} className="cursor-pointer">
          <SerialiseInlineEditor node={{ children: props.label }} />
        </label>
      )}
    </div>
  );
};

// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
