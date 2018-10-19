import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodasticLogo from "./TodasticLogo.vue";

Vue.component("TodasticLogo", TodasticLogo);

storiesOf("TodasticLogo", module).add("default", () => ({
  components: { TodasticLogo },
  render() {
    return <TodasticLogo />;
  }
}));
