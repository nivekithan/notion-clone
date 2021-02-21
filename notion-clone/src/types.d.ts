declare module "shallow-equal" {
  export function shallowEqualArrays(a: any[], b: any[]): boolean;
  export function shallowEqualObjects(
    a: { [i: string]: any },
    b: { [i: string]: any }
  ): boolean;
}

declare module "react-inline-editing" {
  export default function EditableLabel(props: {
    text: string;
    isEditing?: boolean;
    labelClassName?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    inputMaxLength?: number;
    inputPlaceHolder?: string;
    inputWidth?: string;
    inputHeight?: string;
    inputFontSize?: string;
    inputFontWeight?: string;
    inputClassName?: string;
    inputBorderWidth?: string;
    onFocus ?: (text: string) => void;
    onFocusOut ?: (text: string) => void;
  }): JSX.Element;
}

// text (*)	string	Text to be displayed on both the label and initially in the editor
// isEditing	bool	Flags whether the label should be in editor mode
// labelClassName	string	Class name for the text styling
// labelFontSize	string	Font size for the text
// labelFontWeight	string	Font weight for the text
// inputMaxLength	number	Max length for the input in editing mode
// inputPlaceHolder	string	Placeholder for the input in editing mode
// inputWidth	string	Width of the input in editing mode
// inputHeight	string	Height of the input in editing mode
// inputFontSize	string	Font size for the input in editing mode
// inputFontWeight	string	Font weight for the input in editing mode
// inputClassName	string	Class name for the input editor's styling
// inputBorderWidth	string	Border width for the input in editing mode
// onFocus	function	Callback for text focusing. Parameter(s): text
// onFocusOut function	Callback for focus leaving editor. Parameter(s): text
