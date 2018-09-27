const { moveTodo, positionSortFunction } = require("./move-todo.js");

module.exports = replay;

function replay(events) {
  const todos = events.reduce((todos, event) => {
    switch (event.eventType) {
      case "ADDED_TODO":
        return addTodo(todos, event.data);
      case "REMOVED_TODO":
        return removeTodo(todos, event.data);
      case "CHANGED_TODO": // we should probably make this MOVE_TODO and CHANGE_TODO
        if (event.data.parentId !== undefined || event.data.position !== undefined) {
          return moveTodo(todos, event);
        }
        return changedTodo(todos, event.data);
      default:
        return todos;
    }
  }, []);
  return { todos };
}

function addTodo(todos, todoToAdd) {
  todoToAdd.children = todoToAdd.children || [];
  if (todoToAdd.parentId) {
    return todos.map(todo => appendChild(todo, todoToAdd));
  }
  return [...todos, todoToAdd].sort(positionSortFunction);
}

function appendChild(todo, todoToAdd) {
  if (todoToAdd.parentId === todo.todoId) {
    return {
      ...todo,
      children: [...(todo.children || []), todoToAdd].sort(positionSortFunction)
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

function changedTodo(todos, data) {
  return todos.map(todo => {
    if (data.todoId === todo.todoId) {
      return editTodo(todo, data);
    } else {
      return {
        ...todo,
        children: changedTodo(todo.children || [], data)
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
    if (todo.children) {
      todo.children = todo.children.reduce(removeTodoInListOrChildren, []);
    }
    return [...todos, todo];
  }
}
