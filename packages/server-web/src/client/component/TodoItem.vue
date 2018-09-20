<template>
  <div :class="`todo-item todo-item-${todo.todoId}`" :ref="`todo-item-${todo.todoId}`">
    <div :class="`todo ${todo.status === 'done' ? 'todo-done' : ''}`">
      <div class="dropzone-sub" v-if="!updating" v-on:click="updating=true" ref="dropzoneSub"></div>
			<todo-options @click.prevent="toggleAddTodoItem()" />
      <span :class="`status status-${todo.status || 'open'}`" v-on:click="toggleStatus(todo)"></span>
      <span class="id">#{{todo.todoId.substring(0, 4)}}</span>
      <div>
        <span v-if="!updating" :class="`title title-${todo.status || 'open'}`">{{todo.title}}</span>
        <todo-label v-if="!updating" v-for="label in todo.labels" :todoLabel="`${label}`" :key="label" />
      </div>
      <todo-text ref="updater" :visible="updating" v-on:change="updateTitle" v-bind.sync="{ initialTodoTitle: completeText }" :key="`updateTodo-${todo.todoId}`" />
    </div>
    <todo-text ref="adder" v-on:change="addTodo" :visible="adderVisible" :key="`addTodo-${todo.todoId}`" :parentId="todo.todoId" />
  </div>
</template>

<script>
import TodoText from "./TodoText.vue";
import TodoOptions from "./TodoOptions.vue";
import { store } from "../store.js";
import TodoLabel from "./TodoLabel.vue";

export default {
  name: "TodoItem",
  props: ["commands", "todo"],
  components: {
    "todo-text": TodoText,
    "todo-options": TodoOptions,
    "todo-label": TodoLabel
  },
  mounted() {
    const { dropzoneSub } = this.$refs;
    if (dropzoneSub) {
      dropzoneSub.addEventListener("dragenter", this.handleDropzoneEnter, false);
      dropzoneSub.addEventListener("dragover", this.handleDropzoneOver, false);
      dropzoneSub.addEventListener("dragleave", this.handleDropzoneLeave, false);
      dropzoneSub.addEventListener("drop", this.handleDrop, false);
    }
  },
  beforeDestroy() {
    const { dropzoneSub } = this.$refs;
    if (dropzoneSub) {
      dropzoneSub.removeEventListener("dragenter", this.handleDropzoneEnter);
      dropzoneSub.removeEventListener("dragover", this.handleDropzoneOver);
      dropzoneSub.removeEventListener("dragleave", this.handleDropzoneLeave);
      dropzoneSub.removeEventListener("drop", this.handleDrop);
    }
  },
  computed: {
    completeText() {
      return (this.todoTitle + " " + this.todoLabels.join(" ") + " " + this.todoTrackedTimes.join(" ")).trim();
    },
    todoTrackedTimes() {
      return this.$props.todo.trackedTimes.map(tracked => "#TRACK(" + JSON.stringify(tracked) + ")");
    },
    todoTitle() {
      return this.$props.todo.title;
    },
    todoLabels() {
      return this.$props.todo.labels || [];
    },
    titleWithLabels: function() {
      const { todo } = this.$props;
      return `${todo.title} ${todo.labels.join(" ")}`;
    }
  },
  data() {
    return {
      adderVisible: false,
      updating: false
    };
  },
  methods: {
    handleDropzoneEnter(event) {},
    handleDropzoneOver(event) {
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
      event.target.classList.remove("active-top");
      event.target.classList.remove("active-bottom");
    },
    handleDrop(event) {
      const { commands, todo } = this.$props;
      event.target.classList.remove("active-top");
      event.target.classList.remove("active-bottom");
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      commands.changeTodo(myTodo, { parentId: todo.todoId });
    },
    updateTitle(newTitle) {
      const { commands, todo } = this.$props;
      commands.changeTodo(todo, { title: newTitle });
      this.updating = false;
    },
    addTodo(newTitle) {
      const { commands, todo } = this.$props;
      commands.addTodo({ title: newTitle, parentId: todo.todoId });
    },
    toggleStatus(todo) {
      const { commands } = this.$props;
      const newStatus = todo.status == "open" ? "done" : "open";
      commands.changeTodo(todo, { status: newStatus });
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
  margin: 1em 0;
}

.todo {
  position: relative;
  display: grid;
  grid-template-columns: 25px 25px 40px max-content 1fr;
  align-items: center;
}
.todo-done {
  transform: translateX(-50px) scale(0.8);
}
.todo > * {
  padding: 5px;
}
.title-done {
  color: grey;
  text-decoration: line-through;
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
.status.status-done::after {
  content: "x";
}
.status.status-done {
  border: 2px solid grey;
  color: grey;
}
.dropzones {
  display: grid;
  grid-template-columns: 50px 1fr;
}
.dropzone-sub {
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: 25px;
  right: 0;
}
.dropzone-sub.active-top {
  border-top: 5px solid lightgreen;
}
.dropzone-sub.active-bottom {
  border-bottom: 5px solid lightgreen;
}
</style>
