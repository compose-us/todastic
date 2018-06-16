<template>
  <div>
    <h1>Todastic</h1>
    <p>the musical - of Vue!!!11</p>
    <todo-adder :addTodo="commands.addTodo"/>
    <todo-list :commands="commands"/>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoAdder from "./TodoAdder.vue";

export default {
  components: {
    "todo-list": TodoList,
    "todo-adder": TodoAdder
  },
  props: ["commands"]
};

function getPlaceholder() {
  return oneOf(["Get in shape", "Open a zoo", "Start a business", "Write a letter"]);
}

function oneOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>

<style>
body {
  background-color: red;
}
</style>
