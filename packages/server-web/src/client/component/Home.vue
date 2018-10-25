<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <todastic-logo :class="$style.logo" />
      <div :class="$style.nav">
        <button v-if="isAuthenticated" v-on:click="showHelp=true" :class="$style.help">?</button>
        <help v-if="showHelp" @close="showHelp = false" />
        <profile />
      </div>
    </div>
    <script-editor :class="$style.editor" :list="todos" />
    <div :class="$style.todos">
      <todo-list :parentId="null" :todos="todos" key="root-list" />
      <todo-text v-on:change="addTodo" key="root-adder" />
    </div>
  </div>
</template>

<script>
import Help from "./Help.vue";
import Profile from "./Profile.vue";
import TodoList from "./TodoList.vue";
import TodoText from "./TodoText.vue";
import ScriptEditor from "./ScriptEditor.vue";
import { TodasticLogo } from "../../component";

export default {
  components: {
    help: Help,
    profile: Profile,
    "todastic-logo": TodasticLogo,
    "script-editor": ScriptEditor,
    "todo-list": TodoList,
    "todo-text": TodoText
  },
  computed: {
    todos() {
      const { todos } = this.$store.getters;
      return todos;
    }
  },
  data() {
    return {
      showHelp: false
    };
  },
  methods: {
    addTodo(newTitle) {
      const { commands } = this.$store.getters;
      commands.addTodo({ title: newTitle });
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
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
.root {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
}

.nav {
  justify-self: flex-end;
}

.help {
  color: black;
  background: #ffffff;
  border-radius: 50%;
  margin-right: 10px;

  &:hover {
    color: white;
  }
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
