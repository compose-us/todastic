<template>
	<div class="options">
		<div class="toggle-wrap boxed">
		  <div class="move"><i class="fas fa-ellipsis-v" /></div>
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
  float: left;
  min-height: 25px;
  min-width: 25px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
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
