import React from "react";
import cn from "classnames";

import style from "./todo-label.scss";

interface TodoLabelProps {
  className?: string | Object;
  label: { name: string, args: Array<any> };
  selected?: boolean;
}

const TodoLabel = ({ className = null, label, selected = false }: TodoLabelProps) => {
  return <span className={cn(style.root, { [style.selected]: selected }, className)}>#{label.name}</span>;
};

export default TodoLabel;
