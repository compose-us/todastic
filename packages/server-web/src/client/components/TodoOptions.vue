<template>
	<span class="options">
		<span class="remove" @click.prevent="removeTodo()"><i class="fas fa-times"></i></span>
		<span class="move" @drag.prevent="drag()"><i class="fas fa-arrows-alt"></i></span>
		<span class="add-child" @click.prevent="toggleAddTodoItem()">
			<i v-if="adderVisible" class="far fa-minus-square"></i>
			<i v-else class="far fa-plus-square"></i>
		</span>
	</span>
</template>

<script>
export default {
  props: ["adderVisible", "drag", "removeTodo", "toggleAddTodoItem"]
};
</script>

<style>
</style>
