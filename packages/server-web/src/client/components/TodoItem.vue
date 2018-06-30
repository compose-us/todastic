<template>
  <div :class="`todo-item todo-item-${todo.id}`">
    <div class="todo">
			<todo-options
				:adderVisible="adderVisible"
				:drag="drag(todo)"
			  :removeTodo="removeTodo(todo)"
        :toggleAddTodoItem="toggleAddTodoItem"
			/>
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
import TodoOptions from "./TodoOptions.vue";
import { store } from "../store.js";

export default {
  props: ["commands", "todo"],
  components: {
    "todo-adder": TodoAdder,
    "todo-options": TodoOptions,
    "todo-list": () => import("./TodoList.vue") // circular dependency -> import dynamically!
  },
  data() {
    return {
      adderVisible: false
    };
  },
  methods: {
    drag(todo) {
      // FIXME not implemented yet
      return () => {};
    },
    toggleStatus(todo) {
      return () => this.$props.commands.changeTodo(todo, { status: "done" });
    },
    toggleAddTodoItem() {
      this.$data.adderVisible = !this.$data.adderVisible;
      if (this.$data.adderVisible) {
        // Set focus on the input field if adder is toggled to visible
        this.$nextTick(() => this.$refs.adder.$refs.input.focus());
      }
    },
    removeTodo(todo) {
      return () => this.$props.commands.removeTodo(todo);
    }
  }
};
</script>

<style>
.todo-item {
  box-shadow: -3px 0px 3px -3px #000;
  margin: 1em 0;
}

.todo {
	display: grid;
	grid-template-columns: 25px 25px 40px 1fr;
}
.todo > * {
	padding: 5px;
}
.todo::after {
  clear: both;
}

.id {
  margin-right: 5px;
  color: var(--notice-small-color);
}

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
  margin: 5px;
}
.status.status-open {
  content: "x";
}
</style>
