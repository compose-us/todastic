<template>
  <div :class="`todo-item todo-item-${todo.todoId}`" :ref="`todo-item-${todo.todoId}`">
    <div :class="`todo ${todo.status === 'done' ? 'todo-done' : ''} ${expanded && 'expanded'}`">
      <div :class="`dropzone-sub dropzone-${ isDragging ? 'active' : 'inactive' }`" v-if="!updating" ref="dropzoneSub"></div>
			<todo-options
        :adderVisible="adderVisible"
        :expanded="expanded"
        :removeTodo="removeTodo"
        :toggleTodoOptions="toggleTodoOptions"
        :toggleAddTodoItem="toggleAddTodoItem"
      />
      <div :class="`status status-${todo.status || 'open'}`" v-on:click="toggleStatus(todo)"></div>
      <div class="id">#{{todo.todoId.substring(0, 4)}}</div>
      <div>
        <span v-if="!updating" v-on:click="updating=true" :class="`title title-${todo.status || 'open'}`">{{todo.title}}</span>
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
    },
    isDragging() {
      return this.$store.getters.isDragging;
    }
  },
  data() {
    return {
      adderVisible: false,
      expanded: false,
      updating: false
    };
  },
  methods: {
    handleDropzoneEnter(event) {},
    handleDropzoneOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      event.target.classList.remove("active-bottom");
      event.target.classList.add("active-bottom");
      return false;
    },
    handleDropzoneLeave(event) {
      event.target.classList.remove("active-bottom");
    },
    handleDrop(event) {
      const { commands, todo } = this.$props;
      event.target.classList.remove("active-bottom");
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      commands.moveTodo(myTodo, { parentId: todo.todoId, position: todo.position + 1 });
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
    toggleTodoOptions() {
      if (this.expanded && this.adderVisible) {
        this.toggleAddTodoItem();
      }
      this.expanded = !this.expanded;
    },
    toggleAddTodoItem() {
      this.adderVisible = !this.adderVisible;
      if (this.adderVisible) {
        // Set focus on the input field if adder is toggled to visible
        this.$nextTick(() => this.$refs.adder.$refs.input.focus());
      }
    },
    removeTodo() {
      const { commands, todo } = this.$props;
      return commands.removeTodo(todo);
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
  grid-template-columns: 25px 25px max-content max-content 1fr;
  justify-items: center;
  align-items: center;
}
.todo.expanded {
  margin-left: -25px;
  grid-template-columns: 50px 25px max-content max-content 1fr;
  justify-items: left;
}
.todo-done {
  font-size: 0.9em;
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
  top: 0px;
  bottom: -10px;
  left: 25px;
  right: 0;
}
.dropzone-sub.active-bottom {
  border-bottom: 5px solid lightgreen;
}
.dropzone-active {
  z-index: 200;
}
.dropzone-inactive {
  z-index: -1;
}
</style>
