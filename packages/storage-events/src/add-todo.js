module.exports = {
  addTodo
};

function addTodo(todos, todoToAdd) {
  todoToAdd.children = todoToAdd.children || [];
  if (todoToAdd.parentId) {
    return todos.map(todo => appendChild(todo, todoToAdd));
  }
  todoToAdd.position = todos.length;
  return [...todos, todoToAdd];
}

function appendChild(todo, todoToAdd) {
  if (todoToAdd.parentId === todo.todoId) {
    return {
      ...todo,
      children: [...todo.children, { ...todoToAdd, position: todo.children.length }]
    };
  } else if (todo.children && todo.children.length) {
    const mappedChildren = todo.children.map(child => appendChild(child, todoToAdd));
    return {
      ...todo,
      children: [...mappedChildren]
    };
  }
  return todo;
}
