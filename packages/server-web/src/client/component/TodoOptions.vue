<template>
	<div :class="{[$style.options]: true, [$style.expanded]: this.$props.expanded}">
    <div :class="$style.move" @click.prevent="toggleTodoOptions()"><i class="fas fa-ellipsis-v" /></div>
		<div :class="$style.add" @click.prevent="toggleAddTodoItem()"><i :class="`fas fa-${this.$props.adderVisible ? 'minus' : 'plus'}`" /></div>
		<div :class="$style.remove" @click.prevent="removeTodo()"><i class="fas fa-trash" /></div>
	</div>
</template>

<script>
export default {
  props: ["adderVisible", "drag", "expanded", "removeTodo", "toggleAddTodoItem", "toggleTodoOptions"]
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
