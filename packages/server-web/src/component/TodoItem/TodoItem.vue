<template>
  <div :class="[$style.root, isExpanded && $style.isExpanded]">
    <todo-item-expander :class="$style.expander" :is-expanded="isExpanded" :click-action="toggleExpand" />
    <todo-item-status :class="$style.status" :status="todo.status" v-on:click.prevent.stop="toggleState" />
    <div :class="$style.textLabels">
      <todo-item-text :class="$style.text" :text="todo.text" />
      <todo-item-labels :class="$style.labels" :labels="todo.labels" />
    </div>
    <todo-item-text :class="$style.expandedText" :text="todo.text" is-expanded />
  </div>
</template>

<script>
import { TodoItemStatus } from "./TodoItemStatus";
import { TodoItemExpander } from "./TodoItemExpander";
import { TodoItemText } from "./TodoItemText";

export default {
  components: { TodoItemExpander, TodoItemStatus, TodoItemText },
  props: {
    isExpanded: { type: Boolean, default: false },
    isEditing: { type: Boolean, default: false },
    todo: { required: true },
    toggleExpand: { required: true, type: Function },
    toggleState: { required: true, type: Function }
  }
};
</script>

<style lang="scss" module>
.root {
  display: grid;
  grid-template-columns: 2em 2em 1fr;
  align-items: center;
  justify-content: center;
  min-height: 2em;
}

// elements

.expander {
  align-self: center;
  justify-self: center;
}

.status {
  align-self: center;
  justify-self: center;
}

.textLabels {
  margin: 0 0.5em;
  align-self: center;
  display: flex;
}

.labels {
  display: inline-flex;
}

.text {
  display: inline-flex;
  margin-right: 1em;
  align-self: center;
  justify-self: center;
}

.expandedText {
  grid-column: span 3;
  display: none;
}

// modifiers

.isExpanded {
  .expandedText {
    display: block;
  }
}
</style>
