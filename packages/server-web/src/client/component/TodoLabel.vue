<template>
  <span :class="$style.todoLabel" :key="name" :style="`background-color: ${backgroundColor}`" >
    {{name}}
  </span>
</template>

<script>
import { stringToColor } from "../../lib/string-to-color.js";

export default {
  props: ["todoLabel"],
  computed: {
    backgroundColor() {
      return stringToColor(this.name);
    },
    name() {
      const { todoLabel } = this.$props;
      return todoLabel.name ? todoLabel.name : todoLabel;
    }
  }
};
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
