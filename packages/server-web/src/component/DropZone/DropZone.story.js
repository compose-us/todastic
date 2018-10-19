import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import DropZone from "./DropZone.vue";

Vue.component("DropZone", DropZone);

storiesOf("DropZone", module)
  .add("default", () => ({
    components: { DropZone },
    render() {
      return <DropZone click-action={action("clicked on dropzone")} />;
    }
  }))
  .add("dragging", () => ({
    components: { DropZone },
    render() {
      return <DropZone dragging />;
    }
  }));
