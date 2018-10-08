<template>
  <span :class="$style.todoLabel" :key="todoLabel" :style="`background-color: ${backgroundColor}`" >
    {{todoLabel}}
  </span>
</template>

<script>
import { stringToColor } from "../../lib/string-to-color.js";

export default {
  props: ["todoLabel"],
  computed: {
    backgroundColor() {
      return stringToColor(this.$props.todoLabel);
    }
  }
}
</script>

<style lang="scss" module>
.todoLabel {
  float: right;
  margin-left: 5px;
  padding: 2px;
  color: white;
  border-radius: 3px;
}
</style>
