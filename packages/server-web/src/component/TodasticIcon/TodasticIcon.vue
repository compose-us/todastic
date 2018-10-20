<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    :class="{[$style.root]: true, [$style.block]: block}"
    :viewBox="source.viewBox"
  >
    <use :xlink:href="`#${source.id}`" />
  </svg>
</template>

<script>
export default {
  props: ["block", "source"]
};
</script>

<style lang="scss" module>
.root {
  display: inline-block;
  width: 1em;
  height: 1em;
}

// elements

// modifiers

.block {
  display: block;
}
</style>
