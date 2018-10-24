import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import TodoItemStatus from "./TodoItemStatus.vue";
Vue.component("TodoItemStatus", TodoItemStatus);

storiesOf("TodoItem/TodoItemStatus", module)
  .add("open", () => ({
    components: { TodoItemStatus },
    render() {
      return <TodoItemStatus status="open" toggle-state={action("toggle state")} />;
    }
  }))
  .add("done", () => ({
    components: { TodoItemStatus },
    render() {
      return <TodoItemStatus status="done" toggle-state={action("toggle state")} />;
    }
  }));
