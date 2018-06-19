<template>
  <div :class="`todo-item todo-item-${todo.id}`">
    <div class="todo">
      <span class="options">
        <span class="remove" @click.prevent="removeTodo(todo)"><i class="fas fa-times"></i></span>
        <span class="add-child" @click.prevent="toggleAddTodoItem(todo)">
            <i v-if=adderVisible class="far fa-minus-square"></i>
            <i v-else class="far fa-plus-square"></i>
        </span>
      </span>
      <span class="status">{{todo.status}}</span>
      <span class="id">#{{todo.id}}</span>
      <span class="title">{{todo.title}}</span>
    </div>
    <div>
      <todo-list :commands="commands" :todos="todo.children" :parentId="todo.id" />
    </div>
    <todo-adder :parentId="todo.id" :visible="adderVisible" :addTodo="commands.addTodo" />
  </div>
</template>

<script>
import TodoAdder from "./TodoAdder.vue";
import { store } from "../store.js";

export default {
  props: ["todo", "commands"],
  components: {
    "todo-adder": TodoAdder,
    "todo-list": () => import("./TodoList.vue") // circular dependency -> import dynamically!
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
