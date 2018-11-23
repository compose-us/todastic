const I = actor();

module.exports = {
  // Element getters
  newFormEl: () =>
    'div.src-client-component-Home__todos > div.src-client-component-TodoText__todoText > input[type="text"]',
  listEl: () => ".src-client-component-TodoList__todoList > ul",
  optionsMenuEl: () => ".src-client-component-TodoOptions__options",
  destroyEl: () => ".src-client-component-TodoOptions__remove",
  addSubtodoEl: () => ".src-client-component-TodoOptions__add",
  todoItemEl: () => ".src-client-component-TodoItem__todo",
  todoItemTitleEl: () => ".src-client-component-TodoItem__title",

  todoEl(position) {
    console.log(
      "FIXME: getting a Todo at a specific position doesn't work under all circumstances. Use this step with CAUTION"
    );
    return `.src-client-component-TodoList__todoList > ul > li:nth-child(${position})`;
  },

  todoDestroyEl(position) {
    return locate(this.todoEl(position)).find(locate(this.destroyEl()));
  },
  todoAddSubTodoEl(position) {
    return locate(this.addSubtodoEl()).inside(locate(`${this.todoEl(position)}`));
  },
  todoOptionsMenuEl(position) {
    return locate(this.optionsMenuEl()).inside(locate(`${this.todoEl(position)}`));
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
    this.toggleOptionsMenu(position);
    I.click(this.todoDestroyEl(position));
  },

  removeLastTodo() {
    const lastTodo = locate("#ul li").last();
    I.click(locate(this.optionsMenuEl()).inside(lastTodo));
    I.click(locate(this.destroyEl()).inside(lastTodo));
  }
};
