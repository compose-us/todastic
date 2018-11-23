import React, { ReactElement } from "react";
import ReactDom from "react-dom";
import HelloWorld from "./hello-world.tsx";

function add(a: number, b: number): number {
  return a + b;
}

const node = document.getElementById("root");

ReactDom.render(React.createElement(HelloWorld, { add }), node);
