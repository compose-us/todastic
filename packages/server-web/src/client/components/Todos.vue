<template>
  <div>
    <h1>this is a list of todos</h1>
    <ul>
      <li v-for="todo in store.todos" :key="todo.id">{{todo}}</li>
    </ul>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store: store
    };
  }
};
</script>

<style>
body {
  background-color: red;
}
</style>
