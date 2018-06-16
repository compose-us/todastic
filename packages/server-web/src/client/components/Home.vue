<template>
  <div>
    <h1>Todastic</h1>
    <p>the musical - of Vue!!!11</p>
    <todo-list/>
  </div>
</template>

<script>
import todos from "./Todos.vue";

export default {
  components: {
    "todo-list": todos
  }
};
</script>

<style>
body {
  background-color: red;
}
</style>
