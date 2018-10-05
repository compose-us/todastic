<template>
  <div class="todo-item">
    <todo-item-status :status="todo.status" />
    <span>This is a todo-text</span>
  </div>
</template>

<script>
import TodoItemStatus from "./TodoItemStatus.vue";
export default {
  components: { TodoItemStatus },
  props: ["todo"]
};
</script>

<style>
</style>
