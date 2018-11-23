import React from "react";
import ReactDom from "react-dom";
import HelloWorld from "./hello-world";
import add2 from "./adder.js";

function add(a: number, b: number): number {
  return a + b;
}

const node = document.getElementById("root");

ReactDom.render(React.createElement(HelloWorld, { add, add2 }), node);
