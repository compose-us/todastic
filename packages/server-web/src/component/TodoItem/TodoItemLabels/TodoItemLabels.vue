<template>
  <ul :class="[$style.root]">
    <li :class="$style.label" v-for="label in labels" :key="label.id">{{label.text}}</li>
  </ul>
</template>

<script>
export default {
  props: ["labels"]
};
</script>

<style lang="scss" module>
.root {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0 -0.5em;
}

// elements

.label {
  border-radius: 3px;
  border: 1px solid #000;
  padding: 0.25em 0.5em;
  margin: 0 0.5em;
}

// modifiers

.isOpen {
  background-color: #fff;
}

.isDone {
  background-color: #000;
}
</style>
