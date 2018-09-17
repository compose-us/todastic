<template>
  <div :class="`todo-text ${visible ? '' : 'hide'}`">
    <input ref="input" type="text" class="create-todo" @keyup.enter.prevent="submit" :value="todoTitle" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "TodoText",
  props: {
    initialTodoTitle: String,
    visible: { type: Boolean, default: true }
  },
  data() {
    return {
      // we don't want to change the parent element's title directly
      todoTitle: this.$props.initialTodoTitle,
      placeholder: getPlaceholder()
    }
  },
  methods: {
    submit(event) {
      this.$emit('submit', event.target.value);
      // means, we are in "add new" mode
      if(!this.$props.initialTodoTitle) {
        this.$data.todoTitle = "";
        this.$data.placeholder = getPlaceholder();
      }
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

<style scoped>
input {
  display: block;
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
  padding: 10px;
  width: 100%;
  margin-right: 0.5%;
  background-color: rgba(0, 0, 0, 0.05);
}
.hide {
  display: none;
}
</style>
