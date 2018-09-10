<template>
  <div :class="`todo-adder ${visible ? '' : 'hide'}`">
    <input ref="input" type="text" class="create-todo" @keyup.enter.prevent="submit" v-model="todoTitle" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "TodoAdder",
  props: {
    storageFunc: { type: Function, required: true },
    parentId: String,
    initialTodoTitle: String,
    visible: { type: Boolean, default: true }
  },
  data() {
    const data = {
      // we don't want to change the parent element's title directly
      todoTitle: this.initialTodoTitle,
      placeholder: getPlaceholder()
    };
    console.log("showing todo-adder", data);

    return data;
  },
  methods: {
    submit(event) {
      console.log("this.props", this.$props);
      this.$props.storageFunc({ title: this.$data.todoTitle, parentId: this.$props.parentId });
      this.$data.todoTitle = "";
      this.$data.placeholder = getPlaceholder();
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
