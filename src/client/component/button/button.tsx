import React, { ReactChild } from "react";
import noop from "lodash/noop";
import cn from "classnames";

import style from "./button.scss";

interface ButtonProps {
  className?: string | Object;
  children: ReactChild;
  disabled?: boolean;
  submit?: boolean;
  onClick?: (e: React.MouseEvent) => any;
}

const Button = ({ children, className = null, disabled = false, onClick = noop, submit = false }: ButtonProps) => (
  <button
    className={cn(style.root, { [style.disabled]: disabled }, className)}
    disabled={disabled}
    onClick={onClick}
    type={submit ? "submit" : "button"}
  >
    {children}
  </button>
);

export default Button;
