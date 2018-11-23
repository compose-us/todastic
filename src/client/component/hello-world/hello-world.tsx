import React from "react";
import cn from "classnames";
import style from "./hello-world.scss";

interface HelloWorldProps {
  add: (a: number, b: number) => number;
  add2: (a: number, b: number) => number;
}

const HelloWorld = ({ add, add2 }: HelloWorldProps) => (
  <div className={cn(style.root)}>
    hello {add2(1, 2)} world {add(1, 2)}
  </div>
);

export default HelloWorld;
