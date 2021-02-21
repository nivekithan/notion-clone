import React, { useEffect, useRef, useState } from "react";

type InlineEditProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isEditing?: boolean;
  spanProps?: React.HTMLAttributes<HTMLSpanElement>;
  inputValue: string;
  setInputValue: React.Dispatch<
    React.SetStateAction<string | (readonly string[] & string)>
  >;
};

export const InlineEdit = (props: InlineEditProps) => {
  const {
    value,
    spanProps,
    inputValue,
    setInputValue,
    isEditing: defaultIsEditing,
    ...newProps
  } = props;

  const [isEditing, setIsEditing] = useState(defaultIsEditing || false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const onLabelClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return isEditing ? (
    <input
      {...newProps}
      ref={inputRef}
      value={inputValue}
      type="text"
      onChange={(e) => {
        onChange(e);
        props.onChange && props.onChange(e);
      }}
      onKeyDown={(e) => {
        onKeyDown(e);
        props.onKeyDown && props.onKeyDown(e);
      }}
      onBlur={(e) => {
        onBlur(e);
        props.onBlur && props.onBlur(e);
      }}
      style={{
        backgroundColor: "inherit",
        display: "inline-block",
        cursor: "text",
        ...props.style,
      }}
    />
  ) : (
    <span
      onClick={onLabelClick}
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "inline-block",
        cursor: "text",
        width: props.style?.width ? props.style.width : "auto",
      }}
      {...spanProps}
    >
      {inputValue}
    </span>
  );
};
