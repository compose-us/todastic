import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import LoginForm from "./login-form";

storiesOf("Components/LoginForm", module)
  .add("default", () => <LoginForm verifyLogin={action("verifying login")} />)
  .add("isError", () => <LoginForm isError message="This is an error!" verifyLogin={action("verifying login")} />)
  .add("isWarning", () => <LoginForm isWarning message="This is a warning." verifyLogin={action("verifying login")} />);
