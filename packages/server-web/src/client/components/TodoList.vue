<template>
  <div>
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
