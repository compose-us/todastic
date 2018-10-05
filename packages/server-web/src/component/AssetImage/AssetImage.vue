<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    :viewBox="source.viewBox"
  >
    <use :xlink:href="`#${source.id}`" />
  </svg>
</template>

<script>
export default {
  props: ["source"]
};
</script>

<style>
</style>
