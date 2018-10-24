const I = actor();

module.exports = {
  // Element getters
  newFormEl: () =>
    'div.src-client-component-Home__todos > div.src-client-component-TodoText__todoText > input[type="text"]',
  listEl: () => ".src-client-component-TodoList__todoList > ul",

  todoEl(position) {
    return `.todo-list > li:nth-child(${position})`;
  },

  todoDestroyEl(position) {
    return `${this.todoEl(position)} > src-client-component-TodoOptions__remove`;
  },
  todoAddSubTodoEl(position) {
    return `${this.todoEl(position)} > src-client-component-TodoOptions__add`;
  },
  todoOptionsMenuEl(position) {
    return `${this.todoEl(position)} > src-client-component-TodoOptions__options`;
  },

  // Interactions
  addRootlevelTodo(content) {
    I.fillField(this.newFormEl(), content);
    I.pressKey("Enter");
  },

  toggleOptionsMenu(position) {
    I.click(this.todoOptionsMenuEl(position));
  },

  remove(position) {
    I.click(this.todoDestroyEl(position));
  }
};
