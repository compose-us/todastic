import React from "react";
import cn from "classnames";

import style from "./delete-me.scss";

interface DeleteMeProps {
  className?: string | Object;
  modifier?: boolean;
}

const DeleteMe = ({ className = null, modifier = false }: DeleteMeProps) => (
  <div className={cn(style.root, { [style.modifier]: modifier }, className)}>
    <div className={style.someElement}>DeleteMe</div>
  </div>
);

export default DeleteMe;
