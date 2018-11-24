import React from "react";
import { storiesOf } from "@storybook/react";
import TodoStatus from "./todo-status";
import { action } from "@storybook/addon-actions";

storiesOf("Components/TodoStatus", module)
  .add("default", () => <TodoStatus onClick={action("clicked status")} />)
  .add("done", () => <TodoStatus onClick={action("clicked status")} done />);
