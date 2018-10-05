import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import LoginForm from "./LoginForm.vue";
Vue.component("LoginForm", LoginForm);

storiesOf("LoginForm", module).add("default", () => ({
  components: { LoginForm },
  template: "<LoginForm />"
}));
