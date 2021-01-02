import { useState, MouseEvent } from "react";
import {CheckButton} from "../../components/button/checkButton";

export type MCQProps = {
    question : string,
    one : string,
    two : string,
    three : string,
    four : string,
    answer : "one" | "two" | "three" | "four"
} 

export const MCQ = (props : MCQProps) => {

    return <SingleChoice label={"one"} checked={false} />


}

type SingleChoiceProps = {
    label : string,
    checked : boolean
}

type ButtonClick = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void

const SingleChoice = (props : SingleChoiceProps ) => {
    const [isChecked, setIsChecked] = useState(props.checked);

    const onButtonClick : ButtonClick = (e) => {
        e.preventDefault();
        setIsChecked(s => !s)
    }

    return (
        <div onClick={onButtonClick} className="flex flex-row gap-x-2">
            <div className="grid place-items-center"> <CheckButton checked={isChecked} /> </div>
            <div className="grid text-white-white place-items-center">{props.label}</div>
        </div>
    )


}