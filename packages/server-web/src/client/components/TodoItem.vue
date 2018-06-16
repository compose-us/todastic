<template>
  <div>
    <h1>this is a todo</h1>
    <span class="status">{{todo.status}}</span>
    <span class="id">#{{todo.id}}</span>
    <span class="title">{{todo.title}}</span>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  props: ["todo"]
};
</script>

<style>
body {
  background-color: red;
}
</style>
