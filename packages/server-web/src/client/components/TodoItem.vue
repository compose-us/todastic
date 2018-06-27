<template>
  <div :class="`todo-item todo-item-${todo.id}`">
    <div class="todo">
      <span class="options">
        <span class="remove" @click.prevent="removeTodo(todo)"><i class="fas fa-times"></i></span>
        <span class="move" @drag.prevent="drag(todo)"><i class="fas fa-arrows-alt"></i></span>
        <span class="add-child" @click.prevent="toggleAddTodoItem()">
            <i v-if=adderVisible class="far fa-minus-square"></i>
            <i v-else class="far fa-plus-square"></i>
        </span>
      </span>
      <span :class="`status status-${todo.status || 'open'}`" @click.prevent="toggleStatus(todo)"></span>
      <span class="id">#{{todo.id}}</span>
      <span class="title">{{todo.title}}</span>
    </div>
    <todo-list :commands="commands" :todos="todo.children" :parentId="todo.id" />
    <todo-adder ref="adder" :parentId="todo.id" :visible="adderVisible" :addTodo="commands.addTodo" />
  </div>
</template>

<script>
import TodoAdder from "./TodoAdder.vue";
import { store } from "../store.js";

export default {
  props: ["commands", "todo"],
  components: {
    "todo-adder": TodoAdder,
    "todo-list": () => import("./TodoList.vue") // circular dependency -> import dynamically!
  },
  data() {
    return {
      adderVisible: false,
      toggleStatus(todo) {
        return this.$props.commands.changeTodo(todo, { status: "done" });
      },
      toggleAddTodoItem() {
				this.$data.adderVisible = !this.$data.adderVisible;
				if (this.$data.adderVisible) {
					// Set focus on the input field if adder is toggled to visible
					this.$nextTick(() => this.$refs.adder.$refs.input.focus());
				}
      },
      removeTodo(todo) {
        return this.$props.commands.removeTodo(todo);
      }
    };
  }
};
</script>

<style>
.status {
  display: inline-flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  line-height: 15px;
  border: 2px solid #000;
  border-radius: 3px;
}

.status.status-open {
  content: "x";
}
</style>
