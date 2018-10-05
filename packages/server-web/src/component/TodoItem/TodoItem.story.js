import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItem from "./TodoItem.vue";
Vue.component("TodoItem", TodoItem);

storiesOf("TodoItem", module)
  .add("open", () => ({
    components: { TodoItem },
    template: `<TodoItem :todo="{status: 'open'}" />`
  }))
  .add("done", () => ({
    components: { TodoItem },
    template: `<TodoItem :todo="{status: 'done'}" />`
  }));
