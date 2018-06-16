<template>
  <div>
    <input type="text" id="create-todo" @keyup.enter.prevent="submit" v-model="todoTitle" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: ["addTodo", "parentId"],
  data() {
    return {
      todoTitle: "",
      placeholder: getPlaceholder(),
      submit(event) {
        console.log("this.props", this.$props);
        this.$props.addTodo({ title: this.todoTitle, parentId: this.$props.parentId });
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
