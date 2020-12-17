export interface Utility {
  [index: string]: string[];
}
export type ButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export interface DaysINT {
  tags: string[];
  _id: string;
  name: string;
  group_id: string;
}

export interface FormInputs {
  name: string;
  tags: string;
}

export interface FormsINT {
  onSubmit: (data: FormInputs) => void;
  onCancel: ButtonClick;
  defualtValue: {
    name: string;
    tags: string;
  };
}

export {Days} from "./days";
export {DeleteConformation} from "./deleteConform";
export {Form} from "./form";
export {AddNewDays} from "./addNewDays";
export {SingleDay} from "./singleDay";
