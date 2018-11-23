<template>
  <div :class="$style.todoList">
    <ul>
      <li v-for="todo in todos" :key="todo.todoId" :todoId="todo.todoId" draggable="true" ref="dragElement">
        <div :class="{[$style.dropzoneSame]: true, [$style.dropzoneActive]: isDragging, [$style.dropzoneInactive]: !isDragging }" :position="todo.position" ref="dropzoneSame"></div>
        <todo-item :todo="todo"/>
        <todo-list :parentId="todo.todoId" :todos="todo.children"/>
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
  props: ["todos", "parentId"],
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
  computed: {
    isDragging() {
      return this.$store.getters.isDragging;
    }
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
      if (!this.$store.getters.isEditing[todoId]) {
        event.target.classList.add(this.$style.dragging);
        event.dataTransfer.effectAllowed = "copyMove";
        const todo = todos.find(t => t.todoId === todoId);
        event.dataTransfer.setData("json/todo", JSON.stringify(todo));
        this.$store.commit("isDragging", true);
      } else {
        event.preventDefault();
      }
    },
    handleDragEnd(event) {
      event.target.classList.remove(this.$style.dragging);
      this.$store.commit("isDragging", false);
    },
    handleDropzoneEnter(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    handleDropzoneOver(event) {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "copyMove";
      event.target.classList.remove(this.$style.activeTop);
      event.target.classList.remove(this.$style.activeBottom);

      if (this.isTopHalf(event)) {
        event.target.classList.add(this.$style.activeTop);
      } else {
        event.target.classList.add(this.$style.activeBottom);
      }
      return false;
    },
    handleDropzoneLeave(event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.remove(this.$style.activeTop);
      event.target.classList.remove(this.$style.activeBottom);
    },
    handleDrop(event) {
      event.stopPropagation();
      const { parentId, todo } = this.$props;
      const { commands } = this.$store.getters;
      event.target.classList.remove(this.$style.activeTop);
      event.target.classList.remove(this.$style.activeBottom);
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      const position = parseInt(event.target.getAttribute("position"));
      const myPosition = position + (this.isTopHalf(event) ? 0 : 1);
      if (event.altKey) {
        commands.copyTodo(myTodo, parentId);
      } else {
        commands.moveTodo(myTodo, { parentId, position: myPosition });
      }
    },
    isTopHalf(event) {
      const rect = event.target.getBoundingClientRect();
      const topHalfY = rect.top + rect.height / 2;
      return event.clientY <= topHalfY;
    }
  }
};
</script>

<style lang="scss" module>
.todoList {
  clear: both;
  margin: 5px 0;
}
.todoList ul {
  list-style-type: none;
  padding-left: 25px;
}
.todoList ul li {
  position: relative;
}
.dragging {
  border: 1px solid red;
  opacity: 0.2;
}
.dropzoneSame {
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: 0;
  right: 0;
  width: 25px;
}
.dropzoneSame.activeTop {
  border-top: 5px solid lightgreen;
}
.dropzoneSame.activeBottom {
  border-bottom: 5px solid lightgreen;
}
.dropzoneActive {
  z-index: 200;
}
.dropzoneInactive {
  z-index: -1;
}
</style>
