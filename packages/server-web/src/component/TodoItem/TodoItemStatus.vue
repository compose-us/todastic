<template>
  <span :class="{[$style.status]: true, [$style.isOpen]: status === 'open', [$style.isDone]: status === 'done'}"></span>
</template>

<script>
export default {
  props: ["status"]
};
</script>

<style lang="scss" module>
.status {
  border: 1px solid #000;
  display: inline-block;
  height: 1em;
  width: 1em;
}

.isOpen {
  background-color: #fff;
}

.isDone {
  background-color: #000;
}
</style>
