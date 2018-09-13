<template>
  <span class="todo-label" :key="todoLabel" :style="`background-color: ${backgroundColor}`" >
    {{todoLabel}}
  </span>
</template>

<script>
import { stringToColor } from "../string-to-color.js";

export default {
  props: ["todoLabel"],
  computed: {
    backgroundColor: function() {
      return stringToColor(this.$props.todoLabel);
    }
  }
}
</script>

<style>
.todo-label {
  float: right;
  margin-left: 5px;
  padding: 2px;
  color: white;
  border-radius: 3px;
}
</style>
