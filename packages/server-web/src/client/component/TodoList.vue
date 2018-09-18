<template>
  <div class="todo-list">
    <ul>
      <li v-for="todo in todos" :key="todo.todoId" :todoId="todo.todoId" draggable="true" ref="dragElement">
        <div class="dropzone-same" ref="dropzoneSame"></div>
        <todo-item :commands="commands" :todo="todo"/>
        <todo-list :commands="commands" :parentId="todo.todoId" :todos="todo.children"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { store } from "../store.js";
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    "todo-item": TodoItem
  },
  name: "todo-list",
  props: ["commands", "todos", "parentId"],
  mounted() {
    const { dragElement, dropzoneSame } = this.$refs;
    console.log("mounted", this);
    if (dragElement) {
      dragElement.forEach(element => {
        element.addEventListener("dragstart", this.handleDragStart, false);
        element.addEventListener("dragend", this.handleDragEnd, false);
      });
    }
    if (dropzoneSame) {
      dropzoneSame.forEach(element => {
        element.addEventListener("dragenter", this.handleDropzoneEnter, false);
        element.addEventListener("dragover", this.handleDropzoneOver, false);
        element.addEventListener("dragleave", this.handleDropzoneLeave, false);
        element.addEventListener("drop", this.handleDrop, false);
      });
    }
  },
  beforeDestroy() {
    const { dragElement, dropzoneSame } = this.$refs;
    dragElement.forEach(element => {
      element.removeEventListener("dragstart", this.handleDragStart);
      element.removeEventListener("dragend", this.handleDragEnd);
    });
    if (dropzoneSame) {
      dropzoneSame.removeEventListener("dragenter", this.handleDropzoneEnter);
      dropzoneSame.removeEventListener("dragover", this.handleDropzoneOver);
      dropzoneSame.removeEventListener("dragleave", this.handleDropzoneLeave);
      dropzoneSame.removeEventListener("drop", this.droppedIntoSame);
    }
  },
  methods: {
    handleDragStart(event) {
      console.log("handleDragStart");
      event.stopPropagation();
      const { todos } = this.$props;
      const todoId = event.target.getAttribute("todoid");
      event.target.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      const todo = todos.find(t => t.todoId === todoId);
      console.log({ todo, props: this.$props, target: event.target, todoId });
      event.dataTransfer.setData("json/todo", JSON.stringify(todo));
    },
    handleDragEnd(event) {
      event.target.classList.remove("dragging");
      console.log("drag end", event);
    },
    handleDropzoneEnter(event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.add("active");
    },
    handleDropzoneOver(event) {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      return false;
    },
    handleDropzoneLeave(event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.remove("active");
    },
    handleDrop(event) {
      event.stopPropagation();
      const { commands, parentId, todo } = this.$props;
      console.log("dropped into same scope", event, todo);
      event.target.classList.remove("active");
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      // TODO set parentId!
      console.log({ parentId, myTodo });
      // commands.changeTodo(todo, { parentId });
    }
  }
};
</script>

<style scoped>
.todo-list {
  clear: both;
}
.todo-list ul {
  list-style-type: none;
  padding-left: 25px;
}
.todo-list ul li {
  position: relative;
}
.dragging {
  border: 1px solid red;
  opacity: 0.2;
}
.dropzone-same {
  position: absolute;
  height: 100%;
  width: 25px;
  background-color: lightblue;
  opacity: 0.8;
}
.dropzone-same.active {
  background-color: lightgreen;
  opacity: 0.8;
}
</style>
