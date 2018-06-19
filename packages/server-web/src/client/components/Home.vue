<template>
  <div class="todasticapp">
    <h1>Todastic</h1>
    <p>Add new Todo</p>
    <todo-adder :addTodo="commands.addTodo"/>
    <todo-list :commands="commands" :todos="store.todos"/>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoAdder from "./TodoAdder.vue";
import { store } from "../store.js";

export default {
  components: {
    "todo-list": TodoList,
    "todo-adder": TodoAdder
  },
  props: ["commands"],
  data() {
    return {
      store
    };
  }
};

function getPlaceholder() {
  return oneOf(["Get in shape", "Open a zoo", "Start a business", "Write a letter"]);
}

function oneOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>

<style>
  @import "main.css";
</style>
