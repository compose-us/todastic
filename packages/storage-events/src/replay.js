function replay(events) {
  const todos = events.reduce((todos, event) => {
    if (event.event === "ADDED_TODO") {
      return addTodo(todos, event.data);
    } else if (event.event === "REMOVED_TODO") {
      return removeTodo(todos, event.data);
    }
    return todos;
  }, []);
  return { todos };
}

function addTodo(todos, todoToAdd) {
  if (todoToAdd.parentId) {
    return todos.map(todo => {
      return appendChild(todo, todoToAdd);
    });
  }
  return [...todos, todoToAdd];
}

function appendChild(todo, todoToAdd) {
  if (todoToAdd.parentId === todo.id) {
    return {
      ...todo,
      children: [...(todo.children || []), todoToAdd]
    };
  } else if (todo.children && todo.children.length) {
    let mappedChildren = todo.children.map(child => {
      return appendChild(child, todoToAdd);
    });
    return {
      ...todo,
      children: [...mappedChildren]
    };
  }
  return todo;
}

function removeTodo(todos, data) {
  return todos.reduce(removeTodoInListOrChildren, []);

  function removeTodoInListOrChildren(todos, todo) {
    if (todo.id === data.id) {
      return todos;
    }
    if (todo.children) {
      todo.children = todo.children.reduce(removeTodoInListOrChildren, []);
    }
    return [...todos, todo];
  }
}

module.exports = replay;
