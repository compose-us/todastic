import React from "react";

interface HelloWorldProps {
  add: (a: number, b: number) => number;
  add2: (a: number, b: number) => number;
}

const HelloWorld = ({ add, add2 }: HelloWorldProps) => (
  <div>
    hello {add2(1, 2)} world {add(1, 2)}
  </div>
);

export default HelloWorld;
