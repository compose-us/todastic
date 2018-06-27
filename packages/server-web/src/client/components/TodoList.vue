<template>
  <div class="todo-list">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <todo-item :commands="commands" :todo="todo"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { store } from "../store.js";
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    "todo-item": TodoItem
  },
  props: ["commands", "todos", "parentId"]
};
</script>

<style>
.todo-list {
  clear: both;
}
.todo-list ul {
  list-style-type: none;
  padding-left: 25px;
}
</style>
