<template>
  <div class="todasticapp">
    <div>
      <h1>Todastic</h1>
      <todo-list :commands="commands" :parentId="null" :todos="todos" key="root-list" />
      <todo-text v-on:change="addTodo" key="root-adder" />
    </div>
    <script-editor :list="todos" />
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoText from "./TodoText.vue";
import ScriptEditor from "./ScriptEditor.vue";

export default {
  components: {
    "script-editor": ScriptEditor,
    "todo-list": TodoList,
    "todo-text": TodoText
  },
  props: ["commands"],
  methods: {
    addTodo(newTitle) {
      this.$props.commands.addTodo({ title: newTitle });
    }
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    }
  }
};

function getPlaceholder() {
  return oneOf(["Get in shape", "Open a zoo", "Start a business", "Write a letter"]);
}

function oneOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>

<style>
.todasticapp {
  display: grid;
  grid-template-columns: auto 30%;
}
</style>
