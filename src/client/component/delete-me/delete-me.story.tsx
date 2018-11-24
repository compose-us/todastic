import React from "react";
import { storiesOf } from "@storybook/react";
import DeleteMe from "./delete-me";

storiesOf("Components/DeleteMe", module)
  .add("default", () => <DeleteMe />)
  .add("modifier", () => <DeleteMe modifier />);
