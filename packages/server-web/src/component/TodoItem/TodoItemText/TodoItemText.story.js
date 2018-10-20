import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItemText from "./TodoItemText.vue";
Vue.component("TodoItemText", TodoItemText);

storiesOf("TodoItem/TodoItemText", module)
  .add("some text", () => ({
    components: { TodoItemText },
    render() {
      return <TodoItemText text="hello" />;
    }
  }))
  .add("markdown", () => ({
    components: { TodoItemText },
    render() {
      return <TodoItemText text="# hello\nthis is a lot of\n\nTEXT!" />;
    }
  }))
  .add("expanded", () => ({
    components: { TodoItemText },
    render() {
      return <TodoItemText text="# hello\nthis is a lot of\n\nTEXT!" isExpanded />;
    }
  }));
