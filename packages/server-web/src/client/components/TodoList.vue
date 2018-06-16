<template>
  <div>
    <h1>this is a list of todos</h1>
    <ul>
      <li v-for="todo in store.todos" :key="todo.id">
        <todo-item :removeTodo="commands.removeTodo" :todo="todo"/>
      </li>
      <li><todo-adder :addTodo="commands.addTodo" /></li>
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
  props: ["commands"],
  data() {
    return {
      store
    };
  }
};
</script>

<style>
body {
  background-color: red;
}
</style>
