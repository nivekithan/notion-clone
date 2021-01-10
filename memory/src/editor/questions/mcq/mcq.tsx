import {
  SubmitHandler,
  useForm,
  RegisterOptions,
  UseFormMethods,
} from "react-hook-form";
import { CheckButton } from "../../../components/button/checkButton";
import React, { useState } from "react";
import { Node } from "slate";
import { SerialiseInlineEditor, InlineEditor } from "../../inline-editor/";

// -------------------------------------------------------------------

export type MCQProps = {
  question: Node[];
  one: Node[];
  two: Node[];
  three: Node[];
  four: Node[];
  answer: "one" | "two" | "three" | "four";
  formMethod: UseFormMethods<Record<string, any>>;
  name: string;
};

type FormValue = {
  question: string;
};

// -------------------------------------------------------------------

export const MCQ = (props: MCQProps) => {
  const { question, one, two, three, four, answer, name } = props;
  const { register, watch, setValue } = props.formMethod;
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const watchQuestion = watch(name);

  const onCheckClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: "one" | "two" | "three" | "four"
  ) => {
    e.preventDefault();
    setValue("question", value, { shouldDirty: true });
  };

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsEditable((s) => !s);
  };

  return (
    <div className="flex flex-col text-white-white gap-y-12">
      <div className="flex">
        {isEditable ? (
          <span>
            <InlineEditor defaultValue={question} />
          </span>
        ) : (
          <span>
            <SerialiseInlineEditor node={{ children: question }} />
          </span>
        )}
        <button className="btn-blue" onClick={onButtonClick}>
          {isEditable ? "Save" : "Edit"}
        </button>
      </div>
      <div>
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"one"}
          answer={one}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
        />
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"two"}
          answer={two}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
        />
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"three"}
          answer={three}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
        />
        <SingleOption
          onClick={onCheckClick}
          name={name}
          value={"four"}
          answer={four}
          register={register}
          watchQuestion={watchQuestion}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
};

type SingleOptionProps = {
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: "one" | "two" | "three" | "four"
  ) => void;
  name: string;
  value: "one" | "two" | "three" | "four";
  answer: Node[];
  register: (e: HTMLInputElement, options?: RegisterOptions) => void;
  watchQuestion: any;
  isEditable: boolean;
};

const SingleOption = (props: SingleOptionProps) => {
  return (
    <div className="flex flex-row gap-x-2">
      <CheckButton
        checked={!!(props.watchQuestion === props.value)}
        onClick={(e) => props.onClick(e, props.value)}
      />
      <input
        type="radio"
        name={props.name}
        value={props.value}
        id={props.value}
        ref={(e) => props.register(e as HTMLInputElement)}
        className="fixed opacity-0 pointer-events-none"
      />

      {props.isEditable ? (
        <InlineEditor defaultValue={props.answer} />
      ) : (
        <label htmlFor={props.value} className="cursor-pointer">
          <SerialiseInlineEditor node={{ children: props.answer }} />
        </label>
      )}
    </div>
  );
};
