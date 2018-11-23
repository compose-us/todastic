import React from "react";
import ReactDom from "react-dom";

const app = () => <div>hello world</div>;
const node = document.getElementById("root");

ReactDom.render(app, node);
