Feature("Adding todos");

Scenario("on the root node", (I, TodoList) => {
  I.loginForTest();
  TodoList.addRootlevelTodo("Ein neues Todo");
  I.see("Ein neues Todo");
});
