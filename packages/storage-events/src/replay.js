const { addTodo } = require("./add-todo.js");
const { moveTodo } = require("./move-todo.js");

module.exports = replay;

function replay(events) {
  const todos = events.reduce((todos, event) => {
    switch (event.eventType) {
      case "ADDED_TODO":
        return addTodo(todos, event.data);
      case "REMOVED_TODO":
        return removeTodo(todos, event.data);
      case "MOVED_TODO":
        return moveTodo(todos, event);
      case "CHANGED_TODO":
        return changedTodo(todos, event.data);
      default:
        return todos;
    }
  }, []);
  return { todos };
}

function changedTodo(todos, data) {
  return todos.map(todo => {
    if (data.todoId === todo.todoId) {
      return editTodo(todo, data);
    } else {
      return {
        ...todo,
        children: changedTodo(todo.children, data)
      };
    }
  });
}

function editTodo(todo, data) {
  return {
    ...todo,
    ...data
  };
}

function removeTodo(todos, data) {
  return todos.reduce(removeTodoInListOrChildren, []);

  function removeTodoInListOrChildren(todos, todo) {
    if (todo.todoId === data.todoId) {
      return todos;
    }
    todo.children = todo.children.reduce(removeTodoInListOrChildren, []);
    return [...todos, todo];
  }
}
