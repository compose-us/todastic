const { kebabCase, pascalCase } = require("../__helpers.js");

module.exports = name => `import React from "react";
import { storiesOf } from "@storybook/react";
import ${pascalCase(name)} from "./${kebabCase(name)}";

storiesOf("Components/${pascalCase(name)}", module)
  .add("default", () => <${pascalCase(name)} />)
  .add("modifier", () => <${pascalCase(name)} modifier/>);
`;
