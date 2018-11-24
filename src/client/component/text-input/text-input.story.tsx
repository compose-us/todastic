import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TextInput from "./text-input";

storiesOf("Components/TextInput", module)
  .add("default", () => <TextInput defaultValue="hello" onChange={action("change")} />)
  .add("disabled text", () => <TextInput disabled onChange={action("change")} />)
  .add("placeholder", () => <TextInput onChange={action("change")} placeholder="hello placeholder" />);
