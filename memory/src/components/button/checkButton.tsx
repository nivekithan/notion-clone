import { MdCheck, MdCheckBoxOutlineBlank } from "react-icons/md";

export type CheckButtonProps = {
  checked: boolean;
  onClick : (e : React.MouseEvent<HTMLButtonElement, MouseEvent>,) => void
};

export const CheckButton = ({ checked, onClick }: CheckButtonProps) => {
  if (checked) {
    return (
      <button className="inline-block cursor-pointer" onClick={onClick}>
        <MdCheck color={"rgb(255,255,255)"} size="16px" className="bg-blue-primary" />
      </button>
    );
  } else {
    return (
      <button className="inline-block cursor-pointer" onClick={onClick}>
        <MdCheckBoxOutlineBlank
          color={"rgba(255, 255, 255, 0.9)"}
          size="16px"
        />
      </button>
    );
  }
};
