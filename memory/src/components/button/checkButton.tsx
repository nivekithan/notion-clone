import { MdCheck, MdCheckBoxOutlineBlank } from "react-icons/md"


export type CheckButtonProps = {
    checked : boolean
} 

export const CheckButton = ({checked} : CheckButtonProps) => {

   if (checked) {
       return (
           <button className="grid cursor-pointer bg-blue-primary place-items-center">
               <MdCheck color={"rgb(255,255,255)"} size={"16px"} />
           </button>
       )
   } else {
       return  <MdCheckBoxOutlineBlank color={"rgba(255, 255, 255, 0.9)"} className="cursor-pointer" size="16px" />
   }


}