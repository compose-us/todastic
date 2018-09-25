<template>
	<div :class="`options ${this.$props.expanded ? 'expanded' : ''}`">
    <div class="move" @click.prevent="toggleTodoOptions()"><i class="fas fa-ellipsis-v" /></div>
		<div class="add" @click.prevent="toggleAddTodoItem()"><i :class="`fas fa-${this.$props.adderVisible ? 'minus' : 'plus'}`" /></div>
		<div class="remove" @click.prevent="removeTodo()"><i class="fas fa-trash" /></div>
	</div>
</template>

<script>
export default {
  props: ["adderVisible", "drag", "expanded", "removeTodo", "toggleAddTodoItem", "toggleTodoOptions"]
};
</script>

<style>
.options {
  min-height: 25px;
  min-width: 25px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.options.expanded {
  width: 50px;
}
.options .add,
.options .remove {
  display: none;
}
.options.expanded .add,
.options.expanded .remove {
  display: flex;
}
.options .inactive {
  display: none;
}
.options .move {
}
.options .add {
  cursor: hand;
}
.options .remove {
  cursor: crosshair;
}
</style>
