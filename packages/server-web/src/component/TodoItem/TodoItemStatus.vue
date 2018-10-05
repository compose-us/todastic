<template>
  <span :class="{status: 'status', isOpen: status === 'open', isDone: status === 'done'}"></span>
</template>

<script>
export default {
  props: ["status"]
};
</script>

<style scoped>
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
