<template>
  <div :class="$style.todoItem">
    <todo-item-status :class="$style.status" :status="todo.status" />
    <span :class="$style.text">{{todo.text}}</span>
    <ul :class="$style.labels">
      <li :class="$style.label" v-for="label in todo.labels" :key="label.id">{{label.text}}</li>
    </ul>
  </div>
</template>

<script>
import TodoItemStatus from "./TodoItemStatus.vue";
export default {
  components: { TodoItemStatus },
  props: ["todo"]
};
</script>

<style lang="scss" module>
:global(body) {
  background-color: $background-color;
}

.todoItem {
  display: flex;
  align-items: center;
}

.status {
  margin-right: 1em;
}

.text {
  margin: 0.5em;
  margin-right: 1em;
}

.labels {
  list-style-type: none;
  padding: 0;
  margin: 0 -0.5em;
  display: flex;
}

.label {
  border-radius: 3px;
  border: 1px solid #000;
  padding: 0.25em 0.5em;
  margin: 0 0.5em;
}
</style>
