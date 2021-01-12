import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import React, {} from "react";
// --------------------------------------------------------------------------------------
export type AnswerButtonProps = {
  isAnswer: boolean;
  onClick : (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};
// --------------------------------------------------------------------------------------

export const AnswerButton = ({ isAnswer, onClick }: AnswerButtonProps) => {
  return (
    <button className="inline-block cursor-pointer" onClick={onClick}>
      {isAnswer ? (
        <TiTick size="16px" color={"hsl(179, 65%, 43%)"} />
      ) : (
        <MdCheckBoxOutlineBlank
          color={"rgba(255, 255, 255, 0.9)"}
          size="16px"
        />
      )}
    </button>
  );
};
