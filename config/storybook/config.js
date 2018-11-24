import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import "../../src/client/style/scaffolding.scss";

setOptions({
  name: "Todastic",
  hierarchySeparator: /\//,
  showAddonPanel: true,
  sortStoriesByKind: true
});

const req = require.context("../../src/client/component", true, /\.story\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
