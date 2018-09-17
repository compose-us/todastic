<template>
  <div class="todasticapp">
    <div>
      <h1>Todastic</h1>
      <todo-list :commands="commands" :todos="store.todos"/>
      <todo-text :storageFunc="commands.addTodo"/>
    </div>
    <repl :list="store.todos" />
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoText from "./TodoText.vue";
import { store } from "../store.js";
import Repl from "./Repl.vue";

export default {
  components: {
    "todo-list": TodoList,
    "todo-text": TodoText
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
.todasticapp {
  display: grid;
  grid-template-columns: auto 30%;
}
</style>
