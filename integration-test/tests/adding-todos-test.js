Feature("Adding todos");

Before((I, TodoList) => {
  I.loginForTest();
});

Scenario("on the root node", (I, TodoList) => {
  TodoList.addRootlevelTodo("Ein neues Todo");
  I.see("Ein neues Todo");
});

Scenario("as a SubTodo", (I, TodoList) => {
  TodoList.toggleOptionsMenu(1);
  TodoList.toggleSublevelTodoInput(1);
  TodoList.addSublevelTodo(1, "Ein super SubTodo");
  I.see("Ein super SubTodo", TodoList.todoEl(1));
});
