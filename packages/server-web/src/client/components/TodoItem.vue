<template>
  <div class="todo">
    <span class="status">{{todo.status}}</span>
    <span class="id">#{{todo.id}}</span>
    <span class="title">{{todo.title}}</span>
    <span class="remove" @click.prevent="removeTodo(todo)">X</span>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  props: ["todo", "removeTodo"]
};
</script>

<style>
.remove {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 25px;
  width: 25px;
}
</style>
