<template>
  <div :class="{[$style.root]: true, [$style.dragging]: dragging}" v-on:click.stop.prevent="clickAction">
    <div :class="$style.adder">
      <span :class="$style.info" v-if="dragging">drag here to move!</span>
      <span :class="$style.info" v-else>click here to create a new todo!</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dragging", "clickAction"]
};
</script>

<style lang="scss" module>
.root {
  background: transparent;
  position: relative;
  height: 1px;
  border-radius: 0.2em;
  width: 100%;
}

// elements

.adder {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -12px;
  height: 25px;
  width: 100%;

  &:hover {
    background-color: rgba($color-create, 1);
    border-radius: 1em;
    box-shadow: 0 0 1em rgba($color-create, 0.8);

    .info {
      display: block;
    }
  }
}

.info {
  display: none;
}

// modifiers

.dragging {
  &.root {
    box-shadow: 0 0 0.1em;
  }

  .adder {
    &:hover {
      background-color: $color-logo;
    }
  }
}
</style>
