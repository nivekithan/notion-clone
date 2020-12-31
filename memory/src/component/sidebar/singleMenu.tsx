import {MouseEvent} from "react";

// --------------------------------------------------------------------------------------------------
export type SingleMenuProps = {
    label : string,
    onMenuClick : (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void

}

export const SingleMenu = (props : SingleMenuProps) => {
    return (
        <section className={"px-14-px py-2-px cursor-pointer max-w-260 truncate"} onClick={props.onMenuClick}>
            <span>{props.label}</span>
        </section>
    )
}