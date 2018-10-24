const I = actor();

module.exports = {
  // Element getters
  newFormEl: () =>
    'div.src-client-component-Home__todos > div.src-client-component-TodoText__todoText > input[type="text"]',
  listEl: () => ".src-client-component-TodoList__todoList > ul",

  todoEl(position) {
    return `.src-client-component-TodoList__todoList > ul > li:nth-child(${position})`;
  },

  todoDestroyEl(position) {
    return locate(".src-client-component-TodoOptions__remove").inside(locate(`${this.todoEl(position)}`));
  },
  todoAddSubTodoEl(position) {
    return locate(".src-client-component-TodoOptions__add").inside(locate(`${this.todoEl(position)}`));
  },
  todoOptionsMenuEl(position) {
    return locate(".src-client-component-TodoOptions__options").inside(locate(`${this.todoEl(position)}`));
  },

  // Interactions
  addRootlevelTodo(content) {
    I.fillField(this.newFormEl(), content);
    I.pressKey("Enter");
  },

  toggleSublevelTodoInput(position) {
    I.click(this.todoAddSubTodoEl(position));
  },

  addSublevelTodo(position, content) {
    I.fillField(this.todoAddSubTodoEl(position), content);
    I.pressKey("Enter");
  },

  toggleOptionsMenu(position) {
    I.click(this.todoOptionsMenuEl(position));
  },

  remove(position) {
    I.click(this.todoDestroyEl(position));
  }
};
