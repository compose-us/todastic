import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItem from "./TodoItem.vue";
Vue.component("TodoItem", TodoItem);

storiesOf("TodoItem", module)
  .add("open", () => ({
    components: { TodoItem },
    render() {
      const todo = { status: "open", text: "this is an open todo", labels: [] };
      return <todo-item todo={todo} />;
    }
  }))
  .add("done", () => ({
    components: { TodoItem },
    render() {
      const todo = { status: "done", text: "this is a done todo", labels: [] };
      return <todo-item todo={todo} />;
    }
  }))
  .add("with labels", () => ({
    components: { TodoItem },
    render() {
      const todo = {
        status: "open",
        text: "this is a todo with labels",
        labels: [{ id: 1, text: "foo" }, { id: 2, text: "bar" }, { id: 3, text: "baz" }, { id: 4, text: "something" }]
      };
      return <todo-item todo={todo} />;
    }
  }));
