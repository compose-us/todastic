<template>
  <div :class="`todo-item todo-item-${todo.id}`">
    <div class="todo">
			<todo-options
				:adderVisible="adderVisible"
				:drag="drag(todo)"
			  :removeTodo="removeTodo(todo)"
        :toggleAddTodoItem="toggleAddTodoItem"
			/>
      <span :class="`status status-${todo.status || 'open'}`" v-on:click="toggleStatus(todo)"></span>
      <span class="id">#{{todo.todoId.substring(1, 4)}}</span>
      <div>
        <span v-if="!updating" v-on:click="updating=true" :class="`title title-${todo.status || 'open'}`">{{todo.title}}</span>
        <todo-label v-if="!updating" v-for="label in todo.labels" :todoLabel="`${label}`" :key="label" />
      </div>
      <todo-text ref="updater" :visible="updating" :storageFunc="updateTitle" v-bind:initialTodoTitle="titleWithLabels" />
    </div>
    <todo-text ref="adder" :parentId="todo.todoId" :visible="adderVisible" :storageFunc="addTodo" />
  </div>
</template>

<script>
import TodoText from "./TodoText.vue";
import TodoOptions from "./TodoOptions.vue";
import { store } from "../store.js";
import { extractLabels } from "../lib/label-extractor.js";
import TodoLabel from "./TodoLabel.vue";

export default {
  props: ["commands", "todo"],
  components: {
    "todo-text": TodoText,
    "todo-options": TodoOptions,
    "todo-label": TodoLabel
  },
  computed: {
    titleWithLabels: function() {
      return this.$props.todo.title + " " + this.$props.todo.labels.join(" ");
    }
  },
  data() {
    return {
      adderVisible: false,
      updating: false,
      todoTitle: ""
    };
  },
  methods: {
    updateTitle(changedTodo) {
      const { labels, text } = extractLabels(changedTodo.title)
      this.$props.commands.changeTodo(this.todo, { title: text, labels });
      this.updating = false;
    },
    addTodo(todo) {
      const { labels, text } = extractLabels(todo.title)
      this.$props.commands.addTodo({...todo, labels, title: text});
    },
    drag(todo) {
      // FIXME not implemented yet
      return () => {};
    },
    toggleStatus(todo) {
      const newStatus = todo.status == "open" ? "done" : "open";
      this.$props.commands.changeTodo(todo, { status: newStatus });
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
  grid-template-columns: 25px 25px 40px max-content 1fr;
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
  content: "⨯";
}
.status.status-done {
  border: 2px solid grey;
  color: #77b55a;
}
</style>
