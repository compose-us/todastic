<template>
  <div :class="`todo-adder ${visible ? '' : 'hide'}`">
    <input type="text" id="create-todo" @keyup.enter.prevent="submit" v-model="todoTitle" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    addTodo: { type: Function, required: true },
    parentId: Number,
    visible: { type: Boolean, default: true }
  },
  data() {
    const data = {
      todoTitle: "",
      placeholder: getPlaceholder(),
      submit(event) {
        console.log("this.props", this.$props);
        this.$props.addTodo({ title: this.todoTitle, parentId: this.$props.parentId });
        this.todoTitle = "";
        this.placeholder = getPlaceholder();
      }
    };
    console.log("showing todo-adder", data);

    return data;
  }
};

function getPlaceholder() {
  return oneOf(["Get in shape", "Open a zoo", "Start a business", "Write a letter"]);
}

function oneOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>
