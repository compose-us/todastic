<template>
  <div :class="$style.root">
    <textarea rows=10 ref="input" type="text" :class="$style.input" v-model="scriptingText" :placeholder="placeholder" />
    <div style="clear: both;"></div>
    <button :class="$style.button" v-on:click="submit"><todastic-icon :source="playIcon" /></button>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
import * as dashboard from "@todastic/dashboard";
import { TodasticIcon } from "../../component";
import * as icon from "../../asset/icon";

export default {
  name: "ScriptEditor",
  props: {
    list: Array,
    commands: Object
  },
  components: { "todastic-icon": TodasticIcon },
  mounted() {
    const { input } = this.$refs;
    input.addEventListener("dragenter", this.handleDropzoneEnter, false);
    input.addEventListener("dragover", this.handleDropzoneOver, false);
    input.addEventListener("dragleave", this.handleDropzoneLeave, false);
    input.addEventListener("drop", this.handleDrop, false);
  },
  beforeDestroy() {
    const { input } = this.$refs;
    input.removeEventListener("dragenter", this.handleDropzoneEnter);
    input.removeEventListener("dragover", this.handleDropzoneOver);
    input.removeEventListener("dragleave", this.handleDropzoneLeave);
    input.removeEventListener("drop", this.handleDrop);
  },
  data: () => {
    return {
      playIcon: icon.Play,
      isVisible: false,
      scriptingText: "",
      placeholder: "Place your script here\nFor example 'console.log(dashboard.groupByStatus(list))'"
    };
  },
  methods: {
    handleDropzoneEnter(event) {
      event.target.classList.add(this.$style.active);
    },
    handleDropzoneOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      return false;
    },
    handleDropzoneLeave(event) {
      event.target.classList.remove(this.$style.active);
    },
    handleDrop(event) {
      const { todo } = this.$props;
      const { commands } = this.$store.getters;
      event.target.classList.remove(this.$style.active);
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      this.startScript([myTodo], dashboard);
    },
    submit(event) {
      this.startScript(this.$props.list, dashboard);
    },
    startScript(list, dashboard) {
      const { commands } = this.$store.getters;
      const scriptingFunction = new Function("list", "dashboard", "commands", this.scriptingText);
      scriptingFunction(list, dashboard, commands);
    }
  }
};
</script>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input {
  border: 0;
  box-shadow: 0 0 5px -2px #000;
  box-sizing: border-box;
  font-family: $font-family-monospace;
  padding: 5px;
  width: 100%;
  height: auto;
}

.button {
  color: white;
  border-radius: 3px;
  width: 100%;
}

.active {
  box-shadow: 0 0 10px 0 green;
}
</style>
