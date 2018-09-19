<template>
  <div class="repl">
    <textarea rows=10 ref="input" type="text" @keyup.enter.prevent="submit" class="repl-input" v-model="scriptingText" :placeholder="placeholder" />
    <div style="clear: both;"></div>
    <button class="repl-button" v-on:click="submit">&#x25B6;</button>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
import * as dashboard from "@todastic/dashboard";
  export default {
    name: "Repl",
    props: {
      list: Array
    },
    data: () => {
      return {
        isVisible: false,
        scriptingText: "",
        placeholder: "Place your script here\nFor example 'console.log(dashboard.groupByStatus(list))'"
      }
    },
    methods: {
      submit(event) {
        const scriptingFunction = new Function('list', 'dashboard', this.scriptingText);
        scriptingFunction(this.$props.list, dashboard);
        this.scriptingText = "";
      }
    }
  }
</script>

<style>
.repl {
  margin-top: 50px;
  float: right;
  margin-left: 5px;
  padding: 2px;
  height: 100%;
}
.repl-button {
  color: white;
  border-radius: 3px;
  margin-top: 5px;
  margin-right: 50px;
  float: right;
}
.repl-input {
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
  margin-left: 5px;
  box-sizing: border-box;
  padding: 5px;
  width: 90%;
  height: auto;
}
</style>
