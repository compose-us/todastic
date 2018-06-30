<template>
	<div class="options">
		<div class="toggle-wrap boxed">
		  <div class="menu" @drag.prevent="drag()"><i class="fas fa-ellipsis-v" /></div>
		</div>
		<div class="wrap boxed">
  		<div class="move" @drag.prevent="drag()"><i class="fas fa-arrows-alt" /><span class="text">Move Todo</span></div>
			<div class="remove" @click.prevent="removeTodo()"><i class="fas fa-times" /><span class="text">Delete Todo</span></div>
			<div class="add-child" @click.prevent="toggleAddTodoItem()">
				<i v-if="adderVisible" class="far fa-minus-square" />
				<i v-else class="far fa-plus-square" />
				<span class="text">Add Subtodo</span>
			</div>
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
.options > * {
  display: none;
}
.options > .toggle-wrap {
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: move;
  padding: 5px;
  max-width: 25px;
}
.options:hover > .boxed {
	position: relative;
  background-color: var(--options-box-background-color);
}
.options:hover > .boxed:before {
  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  box-shadow: 0 0 5px #000;
}
.options:hover > .wrap {
	display: block;
	width: 150px;
}
.options:hover > .wrap > * {
  display: grid;
  grid-template-columns: 25px 1fr;
}
.options:hover > .wrap > *:hover {
  background-color: var(--options-box-highlight);
}
.options:hover > .wrap > * > * {
  padding: 5px;
}
.options:hover > .wrap > * > i {
  align-self: center;
  justify-self: center;
}
.options .move {
	cursor: move;
}
.options .remove {
	cursor: crosshair;
}
.options .add-child {
	cursor: pointer;
}
</style>
