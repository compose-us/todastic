<template>
  <div :class="{[$style.root]: true, [$style.isOpen]: status === 'open', [$style.isDone]: status === 'done'}" v-on:click.prevent.stop="toggleState" />
</template>

<script>
export default {
  props: ["status", "toggleState"]
};
</script>

<style lang="scss" module>
.root {
  display: inline-block;
  border: 1px solid $color-font;
  height: 1em;
  width: 1em;
}

// elements

// modifiers

.isOpen {
  background-color: $color-background;
}

.isDone {
  background-color: $color-font;
}
</style>
