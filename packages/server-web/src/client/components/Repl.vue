<template>
  <div class="repl">
    <button v-on:click="toggleVisibility">&#x25B6;</button>
    <input ref="input" type="text" @keyup.enter.prevent="submit" :class="`repl-input ${isVisible ? '' : 'hide'}`" v-model="scriptingText" placeholder="Place your script here" />
  </div>
</template>

<script>
  export default {
    name: "Repl",
    data: () => {
      return {
        isVisible: false,
        scriptingText: ""
      }
    },
    methods: {
      toggleVisibility() {
        this.isVisible = !this.isVisible;
      },
      submit(event) {
        eval(this.scriptingText);
        this.scriptingText = "";
      }
    }
  }
</script>

<style>
.repl {
  margin-left: 5px;
  padding: 2px;
  border-radius: 3px;
  color: white;
}
.repl-input {
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
  margin-left: 5px;
  box-sizing: border-box;
  padding: 5px;
  width: 80%;
}
.hide {
  display: none;
}
</style>
