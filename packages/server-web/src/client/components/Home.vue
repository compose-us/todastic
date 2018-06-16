<template>
  <div>
    <h1>Todastic</h1>
    <p>the musical - of Vue!!!11</p>
    <input type="text" id="create-todo" @keyup.enter.prevent="submit" v-model="todoTitle" :placeholder="placeholder" />
    <todo-list/>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";

export default {
  components: {
    "todo-list": TodoList
  },
  props: ["commands"],
  data() {
    return {
      todoTitle: "",
      placeholder: getPlaceholder(),
      submit(event) {
        console.log("props", this.$props);
        console.log("event", event);
        this.$props.commands.addTodo({ title: this.todoTitle });
        this.todoTitle = "";
        this.placeholder = getPlaceholder();
      }
    };
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
body {
  background-color: red;
}
</style>
