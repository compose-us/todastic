import { configure } from "@storybook/vue";

import Vue from "vue";

// Import your custom components.
import LoginForm from "../../src/component/LoginForm.vue";

// Register custom components.
Vue.component("LoginForm", LoginForm);

function loadStories() {
  // You can require as many stories as you need.
  require("../../src/component/LoginForm.story.js");
}

configure(loadStories, module);
