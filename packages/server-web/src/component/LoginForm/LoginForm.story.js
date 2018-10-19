import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import LoginForm from "./LoginForm.vue";
Vue.component("LoginForm", LoginForm);

storiesOf("LoginForm", module)
  .add("failing", () => ({
    components: { LoginForm },
    render() {
      let i = 0;
      const login = async () => {
        i++;
        throw new Error(`Failed to login, try ${i}`);
      };
      return <LoginForm verifyLogin={login} />;
    }
  }))
  .add("succeeding", () => ({
    components: { LoginForm },
    render() {
      const login = async (...args) => {
        action("logging in")(...args);
      };
      return <LoginForm verifyLogin={login} />;
    }
  }));
