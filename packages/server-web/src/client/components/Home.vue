<template>
  <div class="todasticapp">
    <h1>Todastic</h1>
    <todo-list :commands="commands" :todos="store.todos"/>
    <todo-adder :addTodo="commands.addTodo"/>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoAdder from "./TodoAdder.vue";
import { store } from "../store.js";
import UserProfile from "./UserProfile.vue";

export default {
  components: {
    "todo-list": TodoList,
    "todo-adder": TodoAdder,
    "user-profile": UserProfile
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
