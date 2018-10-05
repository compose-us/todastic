import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItemStatus from "./TodoItemStatus.vue";
Vue.component("TodoItemStatus", TodoItemStatus);

storiesOf("TodoItemStatus", module)
  .add("open", () => ({
    components: { TodoItemStatus },
    template: "<TodoItemStatus status='open' />"
  }))
  .add("done", () => ({
    components: { TodoItemStatus },
    template: "<TodoItemStatus status='done' />"
  }));
