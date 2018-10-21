<template>
  <div :class="$style.todasticapp">
    <script-editor :class="$style.editor" :commands="commands" :list="todos" />
    <div :class="$style.todos">
      <todo-list :parentId="null" :todos="todos" key="root-list" />
      <todo-text v-on:change="addTodo" key="root-adder" />
    </div>
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
  methods: {
    addTodo(newTitle) {
      const { commands } = this.$store.getters;
      commands.addTodo({ title: newTitle });
    }
  },
  computed: {
    todos() {
      const { todos } = this.$store.getters;
      return todos;
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

<style lang="scss" module>
.todasticapp {
  display: flex;
  flex-direction: column;
}

.editor {
  width: 100%;
  margin: 25px 0;
}

.todos {
  width: 100%;
  height: 100%;
}
</style>
