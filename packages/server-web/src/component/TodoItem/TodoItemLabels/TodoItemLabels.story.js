import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItemLabels from "./TodoItemLabels.vue";
Vue.component("TodoItemLabels", TodoItemLabels);

storiesOf("TodoItem/TodoItemLabels", module)
  .add("no labels", () => ({
    components: { TodoItemLabels },
    render() {
      return <TodoItemLabels labels={[]} />;
    }
  }))
  .add("single label", () => ({
    components: { TodoItemLabels },
    render() {
      return <TodoItemLabels labels={[{ id: 1, text: "hello" }]} />;
    }
  }))
  .add("multiple labels", () => ({
    components: { TodoItemLabels },
    render() {
      return <TodoItemLabels labels={[{ id: 1, text: "hello" }, { id: 2, text: "foo" }, { id: 3, text: "bar" }]} />;
    }
  }));
