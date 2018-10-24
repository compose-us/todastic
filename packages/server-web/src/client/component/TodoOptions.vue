<template>
	<div :class="{[$style.options]: true, [$style.expanded]: this.$props.expanded}">
    <div :class="$style.move" @click.prevent="toggleTodoOptions()"><i class="fas fa-ellipsis-v" /></div>
		<div :class="$style.remove" @click.prevent="removeTodo()"><todastic-icon :source="trashIcon" /></div>
		<div :class="$style.add" @click.prevent="toggleAddTodoItem()">
      <i :class="`fas fa-${this.$props.adderVisible ? 'minus' : 'plus'}`" />
    </div>
	</div>
</template>

<script>
import { TodasticIcon } from "../../component";
import * as icon from "../../asset/icon";

export default {
  props: ["adderVisible", "drag", "expanded", "removeTodo", "toggleAddTodoItem", "toggleTodoOptions"],
  components: {
    "todastic-icon": TodasticIcon
  },
  data() {
    return {
      trashIcon: icon.Trash
    };
  }
};
</script>

<style lang="scss" module>
.options {
  min-height: 25px;
  min-width: 25px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  &.expanded {
    width: 50px;
    .add,
    .remove {
      display: flex;
    }
  }

  .add,
  .remove {
    display: none;
  }
  .add {
    cursor: hand;
  }
  .remove {
    cursor: crosshair;
  }

  .inactive {
    display: none;
  }
}
</style>
