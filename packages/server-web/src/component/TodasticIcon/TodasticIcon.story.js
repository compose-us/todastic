import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodasticIcon from "./TodasticIcon.vue";

import * as icon from "../../asset/icon";

Vue.component("TodasticIcon", TodasticIcon);

storiesOf("TodasticIcon", module)
  .add("block", () => ({
    components: { TodasticIcon },
    render() {
      return <TodasticIcon source={icon.Calendar} block />;
    }
  }))
  .add("Calendar", () => ({
    components: { TodasticIcon },
    render() {
      return <TodasticIcon source={icon.Calendar} />;
    }
  }))
  .add("inline text", () => ({
    components: { TodasticIcon },
    render() {
      return (
        <div>
          There is a <TodasticIcon source={icon.Calendar} /> in my sentence!
        </div>
      );
    }
  }))
  .add("Clock", () => ({
    components: { TodasticIcon },
    render() {
      return <TodasticIcon source={icon.Clock} />;
    }
  }));
