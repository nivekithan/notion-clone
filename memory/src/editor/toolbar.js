import {FaBold} from "react-icons/fa";
import {} from "slate-react";

const icon_for_format = {
    "bold" : "FaBold"
}


export const MarkButton = ({format}) => {


    const buttonUtility = ["cursor-pointer", "inline-block"]



    switch (format) {
        case "bold" :
            return (
                <div className={buttonUtility.join(" ")} >
                    <FaBold />
                </div>
            )
        default:
            return null;
    }
    

}
