import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItemExpander from "./TodoItemExpander.vue";
Vue.component("TodoItemExpander", TodoItemExpander);

storiesOf("TodoItem/TodoItemExpander", module).add("default", () => ({
  components: { TodoItemExpander },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    clickAction() {
      console.log("clickaction");
      this.$data.isExpanded = !this.$data.isExpanded;
    }
  },
  render() {
    return <TodoItemExpander isExpanded={this.$data.isExpanded} clickAction={this.clickAction} />;
  }
}));
