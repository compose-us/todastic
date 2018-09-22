<template>
  <div class="script-editor">
    <textarea rows=10 ref="input" type="text" @keyup.enter.prevent="submit" class="script-editor-input" v-model="scriptingText" :placeholder="placeholder" />
    <div style="clear: both;"></div>
    <button class="script-editor-button" v-on:click="submit">&#x25B6;</button>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
import * as dashboard from "@todastic/dashboard";
export default {
  name: "ScriptEditor",
  props: {
    list: Array
  },
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
      isVisible: false,
      scriptingText: "",
      placeholder: "Place your script here\nFor example 'console.log(dashboard.groupByStatus(list))'"
    };
  },
  methods: {
    handleDropzoneEnter(event) {
      event.target.classList.add("active");
    },
    handleDropzoneOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      return false;
    },
    handleDropzoneLeave(event) {
      event.target.classList.remove("active");
    },
    handleDrop(event) {
      const { commands, todo } = this.$props;
      event.target.classList.remove("active");
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      this.startScript([myTodo], dashboard);
    },
    submit(event) {
      this.startScript(this.$props.list, dashboard);
    },
    startScript(list, dashboard) {
      const scriptingFunction = new Function("list", "dashboard", this.scriptingText);
      scriptingFunction(list, dashboard);
    }
  }
};
</script>

<style>
.script-editor {
  margin-top: 50px;
  float: right;
  margin-left: 5px;
  padding: 2px;
  height: 100%;
}
.script-editor-button {
  color: white;
  border-radius: 3px;
  margin-top: 5px;
  margin-right: 50px;
  float: right;
}
.script-editor-input {
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
  margin-left: 5px;
  box-sizing: border-box;
  padding: 5px;
  width: 90%;
  height: auto;
}
.active {
  box-shadow: 0 0 10px 0 green;
}
</style>
