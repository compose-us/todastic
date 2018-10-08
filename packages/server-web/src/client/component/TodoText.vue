<template>
  <div :class="{[$style.todoText]: true, [$style.hide]: !visible}">
    <input ref="input" type="text" :class="$style.createTodo" @keyup.enter.prevent="change" :value="todoTitle" :placeholder="placeholder" />
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
      placeholder: getPlaceholder()
    };
  },
  computed: {
    todoTitle() {
      return this.$props.initialTodoTitle;
    }
  },
  methods: {
    change(event) {
      if(event.target.value !== "") {
        this.$emit("change", event.target.value);
        // means, we are in "add new" mode
        if (!this.$props.initialTodoTitle) {
          this.$data.todoTitle = "";
          this.$data.placeholder = getPlaceholder();
        }
      }
    }
  }
};

function getPlaceholder() {
  const randomAdj = oneOf(
    "a heartwarming",
    "a really nice",
    "a regional",
    "a valuable",
    "a virtual",
    "a welcoming",
    "an embarassing",
    "an inviting",
    "the best"
  );
  return oneOf(
    `Get in ${oneOf("better", "great", "nice", "proper", "the best")} shape`,
    `${oneOf("Create", "Start", "Open", "Set up")} ${randomAdj} ${oneOf(
      "back yard",
      "business",
      "kindergarden",
      "school",
      "zoo"
    )}`,
    `${oneOf("Buy", "Rent", "Invest in")} ${randomAdj} ${oneOf(
      "banana",
      "book",
      "business",
      "car",
      "cat",
      "cheese cake",
      "fitness drink",
      "elephant",
      "startup",
      "tiger",
      "zebra"
    )}`,
    `Write ${randomAdj} ${oneOf("book", "invitation", "letter")}`
  );
}

function oneOf(...arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>

<style lang="scss" module>
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
