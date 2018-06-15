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

function addTodo(todos, data) {
  if (data.parentId) {
    return todos.map(todo => {
      if (data.parentId === todo.id) {
        return {
          ...todo,
          children: [...(todo.children || []), data]
        };
      }
      return todo;
    });
  }
  return [...todos, data];
}

function removeTodo(todos, data) {
  return todos.filter(todo => todo.id !== data.id);
}

module.exports = {
  replay
};
