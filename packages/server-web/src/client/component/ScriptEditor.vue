<template>
  <div :class="$style.root">
    <textarea rows=10 ref="input" type="text" :class="$style.input" v-model="scriptingText" :placeholder="placeholder" />
    <div style="clear: both;"></div>
    <button :class="$style.button" v-on:click="submit">&#x25B6;</button>
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
      const { commands, todo } = this.$props;
      event.target.classList.remove(this.$style.active);
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

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input {
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
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
