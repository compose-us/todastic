import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItemStatus from "./TodoItemStatus.vue";
Vue.component("TodoItemStatus", TodoItemStatus);

storiesOf("TodoItem/TodoItemStatus", module)
  .add("open", () => ({
    components: { TodoItemStatus },
    render() {
      return <TodoItemStatus status="open" />;
    }
  }))
  .add("done", () => ({
    components: { TodoItemStatus },
    render() {
      return <TodoItemStatus status="done" />;
    }
  }));
