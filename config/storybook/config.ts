import { addDecorator, configure } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import "./addons.ts";
import "../../src/client/style/scaffolding.scss";

addDecorator(
  withOptions({
    name: "Todastic",
    hierarchySeparator: /\//,
    showAddonPanel: true,
    sortStoriesByKind: true
  })
);

const req = require.context("../../src/client/component", true, /\.story\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
