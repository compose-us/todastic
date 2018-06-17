<template>
  <div :class="`todo-item todo-item-${todo.id}`">
    <div class="todo">
      <span class="options">
        <span class="remove" @click.prevent="removeTodo(todo)">X</span>
        <span class="add-child" @click.prevent="toggleAddTodoItem(todo)">{{ adderVisible ? '-' : '+'}}</span>
      </span>
      <span class="status">{{todo.status}}</span>
      <span class="id">#{{todo.id}}</span>
      <span class="title">{{todo.title}}</span>
    </div>
    <todo-adder :parentId="todo.id" :visible="adderVisible" />
  </div>
</template>

<script>
import TodoAdder from "./TodoAdder.vue";
import { store } from "../store.js";

export default {
  props: ["todo", "removeTodo"],
  components: {
    todoAdder: TodoAdder
  },
  data() {
    return {
      toggleAddTodoItem(todo) {
        this.$data.adderVisible = !this.$data.adderVisible;
      },
      adderVisible: false
    };
  }
};
</script>

<style>
.todo::after {
  clear: both;
}
.remove,
.add-child {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 25px;
  width: 25px;
}
.options {
  float: right;
}
</style>
