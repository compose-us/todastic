import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItem from "./TodoItem.vue";
Vue.component("TodoItem", TodoItem);

storiesOf("TodoItem", module)
  .add("open", () => ({
    components: { TodoItem },
    render() {
      const todo = { status: "open" };
      return <todo-item todo={todo} />;
    }
  }))
  .add("done", () => ({
    components: { TodoItem },
    render() {
      const todo = { status: "done" };
      return <todo-item todo={todo} />;
    }
  }));
