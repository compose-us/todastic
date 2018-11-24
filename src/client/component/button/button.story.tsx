import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./button";

storiesOf("Components/Button", module)
  .add("default", () => <Button onClick={action("clicked")}>Some text on button</Button>)
  .add("disabled", () => (
    <Button onClick={action("clicked disabled button?")} disabled>
      Disabled
    </Button>
  ));
