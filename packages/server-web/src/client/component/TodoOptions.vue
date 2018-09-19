<template>
	<div class="options">
    <div class="move"><i class="fas fa-ellipsis-v" /></div>
		<div class="toggle-wrap boxed">
			<div class="remove" @click.prevent="removeTodo()"><i class="fas fa-trash" /></div>
		</div>
	</div>
</template>

<script>
export default {
  props: ["adderVisible", "drag", "removeTodo", "toggleAddTodoItem"]
};
</script>

<style>
.options {
  min-height: 25px;
  min-width: 25px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.options .boxed > div {
  margin: 0 5px;
}
.options .move {
  cursor: move;
}
.options .remove {
  cursor: crosshair;
}
</style>
