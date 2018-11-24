import React from "react";
import { storiesOf } from "@storybook/react";
import HelloWorld from "./hello-world";

storiesOf("Components|", module).add("default", () => (
  <HelloWorld add={(a, b) => b + a} add2={(a, b) => a + b} />
));
