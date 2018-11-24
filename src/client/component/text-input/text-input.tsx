import React, { useState } from "react";
import cn from "classnames";

import style from "./text-input.scss";

interface TextInputProps {
  autocomplete?: string;
  className?: string | Object;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (newText: string) => any;
  placeholder?: string;
  type?: "password" | "text";
  value?: string;
}

const TextInput = ({
  autocomplete = "off",
  className = null,
  disabled = false,
  placeholder = "",
  onChange,
  type = "text",
  value = ""
}: TextInputProps) => {
  const [text, setText] = useState(value);
  return (
    <input
      autoComplete={autocomplete}
      className={cn(style.root, { [style.disabled]: disabled }, className)}
      disabled={disabled}
      onChange={e => {
        setText(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={placeholder}
      type={type}
      value={text}
    />
  );
};

export default TextInput;
