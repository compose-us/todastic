<template>
  <span :class="{[$style.root]: true, [$style.isOpen]: status === 'open', [$style.isDone]: status === 'done'}" />
</template>

<script>
export default {
  props: ["status"]
};
</script>

<style lang="scss" module>
.root {
  border: 1px solid #000;
  display: inline-block;
  height: 1em;
  width: 1em;
}

// elements

// modifiers

.isOpen {
  background-color: #fff;
}

.isDone {
  background-color: #000;
}
</style>
