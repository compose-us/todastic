<template>
  <div :class="$style.todoText">
    <input 
      ref="input"
      type="text"
      :class="$style.createTodo"
      :value="todoTitle"
      :placeholder="placeholder"
      @keyup.enter.prevent="change"
      @blur="change"
    />
  </div>
</template>

<script>
export default {
  name: "TodoText",
  props: {
    initialTodoTitle: String
  },
  data() {
    return {
      // we don't want to change the parent element's title directly
      placeholder: getPlaceholder(),
      canceling: false
    };
  },
  computed: {
    isAddingTodo() {
      return !this.$props.initialTodoTitle;
    },
    todoTitle() {
      return this.$props.initialTodoTitle;
    }
  },
  methods: {
    escapeKeyListener(event) {
      const escapePressed = event.keyCode === 27;
      if (escapePressed) {
        this.$data.todoTitle = this.$props.initialTodoTitle;
        this.$data.canceling = true;
        this.$emit("cancel");
      }
    },
    isChangeEvent(event) {
      const saveOnEnter = event.type === "keyup" && event.keyCode === 13;
      const saveOnBlur = event.type === "blur" && !this.isAddingTodo;
      const hasValue = event.target.value !== "";
      return !this.$data.canceling && hasValue && (saveOnEnter || saveOnBlur);
    },
    change(event) {
      if (this.isChangeEvent(event)) {
        this.$emit("change", event.target.value);
        if (this.isAddingTodo) {
          this.$data.todoTitle = "";
          this.$data.placeholder = getPlaceholder();
        }
      }
    }
  },
  created() {
    if (!this.isAddingTodo) {
      document.addEventListener("keyup", this.escapeKeyListener);
      this.$nextTick(() => this.$refs.input.focus());
    }
  },
  destroyed() {
    if (!this.isAddingTodo) {
      document.removeEventListener("keyup", this.escapeKeyListener);
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
.todoText {
  input {
    display: block;
    border: 0;
    box-shadow: 0 2px 1px -1px #000;
    padding: 10px;
    width: 100%;
    margin-right: 0.5%;
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.hide {
  display: none;
}
</style>
