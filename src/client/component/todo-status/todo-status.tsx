import React from "react";
import noop from "lodash/noop";
import cn from "classnames";

import style from "./todo-status.scss";

interface TodoStatusProps {
  className?: string | Object;
  done?: boolean;
  onClick?: () => {};
}

const TodoStatus = ({ className = null, done = false, onClick = noop }: TodoStatusProps) => (
  <div className={cn(style.root, { [style.done]: done }, className)} onClick={onClick} />
);

export default TodoStatus;
