<template>
  <div>
    <h1>Todastic</h1>
    <p>the musical - of Vue!!!11</p>
    <todo-adder :addTodo="commands.addTodo"/>
    <todo-list :commands="commands"/>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoAdder from "./TodoAdder.vue";

export default {
  components: {
    "todo-list": TodoList,
    "todo-adder": TodoAdder
  },
  props: ["commands"]
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
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#fc3279+0,2989d8+50,207cca+51,7db9e8+100 */
  background: #fc3279; /* Old browsers */
  background: -moz-linear-gradient(-45deg, #fc3279 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg, #fc3279 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg, #fc3279 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc3279', endColorstr='#7db9e8',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

}
</style>
