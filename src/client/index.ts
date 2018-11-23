import React from "react";
import ReactDom from "react-dom";
import "./style/scaffolding.scss";
import App from "./component/app";

const node = document.getElementById("root");

ReactDom.render(React.createElement(App), node);
