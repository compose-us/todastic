import React from "react";
import { storiesOf } from "@storybook/react";
import TodoLabel from "./todo-label";

storiesOf("Components/TodoLabel", module)
  .add("default", () => <TodoLabel label={{ name: "test", args: [] }} />)
  .add("selected", () => <TodoLabel label={{ name: "some-label", args: [] }} selected />)
  .add("track call", () => <TodoLabel label={{ name: "track", args: [{ tracker: "John", time: "01:23:45" }] }} />);
