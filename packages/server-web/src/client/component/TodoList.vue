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
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    "todo-item": TodoItem
  },
  name: "todo-list",
  props: ["commands", "todos", "parentId"],
  beforeUpdate() {
    this.removeDragListeners();
  },
  updated() {
    this.addDragListeners();
  },
  mounted() {
    this.addDragListeners();
  },
  beforeDestroy() {
    this.removeDragListeners();
  },
  methods: {
    addDragListeners() {
      const { dragElement, dropzoneSame } = this.$refs;
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
    removeDragListeners() {
      const { dragElement, dropzoneSame } = this.$refs;
      if (dragElement) {
        dragElement.forEach(element => {
          element.removeEventListener("dragstart", this.handleDragStart);
          element.removeEventListener("dragend", this.handleDragEnd);
        });
      }
      if (dropzoneSame) {
        dropzoneSame.forEach(element => {
          element.removeEventListener("dragenter", this.handleDropzoneEnter);
          element.removeEventListener("dragover", this.handleDropzoneOver);
          element.removeEventListener("dragleave", this.handleDropzoneLeave);
          element.removeEventListener("drop", this.droppedIntoSame);
        });
      }
    },
    handleDragStart(event) {
      event.stopPropagation();
      const { todos } = this.$props;
      const todoId = event.target.getAttribute("todoid");
      event.target.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      const todo = todos.find(t => t.todoId === todoId);
      event.dataTransfer.setData("json/todo", JSON.stringify(todo));
    },
    handleDragEnd(event) {
      event.target.classList.remove("dragging");
    },
    handleDropzoneEnter(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    handleDropzoneOver(event) {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      event.target.classList.remove("active-top");
      event.target.classList.remove("active-bottom");

      const rect = event.target.getBoundingClientRect();
      const topHalfY = rect.top + rect.height / 2;
      const isTopHalf = event.clientY <= topHalfY;

      if (isTopHalf) {
        event.target.classList.add("active-top");
      } else {
        event.target.classList.add("active-bottom");
      }
      return false;
    },
    handleDropzoneLeave(event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.remove("active-top");
      event.target.classList.remove("active-bottom");
    },
    handleDrop(event) {
      event.stopPropagation();
      const { commands, parentId, todo } = this.$props;
      console.log("dropped into same scope", event, todo);
      event.target.classList.remove("active-top");
      event.target.classList.remove("active-bottom");
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      // TODO set parentId!
      console.log({ parentId, myTodo });
      commands.changeTodo(myTodo, { parentId });
    }
  }
};
</script>

<style scoped>
.todo-list {
  clear: both;
  margin: 5px 0;
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
  top: -10px;
  bottom: -10px;
  left: 0;
  right: 0;
  width: 25px;
}
.dropzone-same.active-top {
  border-top: 5px solid lightgreen;
}
.dropzone-same.active-bottom {
  border-bottom: 5px solid lightgreen;
}
</style>
