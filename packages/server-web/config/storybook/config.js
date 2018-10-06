import { configure } from "@storybook/vue";
import { setOptions } from "@storybook/addon-options";
import "../../src/style/scaffolding.scss";

setOptions({
  name: "Todastic Components",
  showAddonPanel: true,
  sortStoriesByKind: true
});

const req = require.context("../../src/component", true, /\.story\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
