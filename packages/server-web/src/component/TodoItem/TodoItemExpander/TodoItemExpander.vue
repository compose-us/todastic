<template>
  <div :class="[$style.root, isExpanded && $style.isExpanded]" v-on:click.prevent.stop="clickAction">
    <todastic-icon :class="$style.chevron" :source="chevron" />
  </div>
</template>

<script>
import * as icon from "../../../asset/icon";

export default {
  props: ["clickAction", "isExpanded"],
  data() {
    return {
      chevron: icon.Chevron
    };
  }
};
</script>

<style lang="scss" module>
.root {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
}

// elements

.chevron {
  color: $color-font;
  transition: transform 0.2s ease-in-out;
}

// modifiers

.isExpanded {
  .chevron {
    transform: rotate(90deg);
  }
}
</style>
