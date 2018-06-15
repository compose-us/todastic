function replay(events) {
  const addedTodoEvents = events.filter(event => event.event === "ADDED_TODO");
  const removedTodoEvents = events.filter(event => event.event === "REMOVED_TODO");
  const todos = removeTodos(addTodos(addedTodoEvents), removedTodoEvents);
  return { todos };
}

function addTodos(events) {
  const parents = events.map(event => event.data).filter(event => event.parentId === undefined);
  const children = events.map(event => event.data).filter(event => event.parentId !== undefined);
  const todos = parents;
  children.forEach(todo => {
    const foundParent = todos.find(parent => parent.id === todo.parentId);
    foundParent.children = foundParent.children || [];
    foundParent.children.push(todo);
  });
  return todos;
}

function removeTodos(todos, events) {
  return todos.filter(todo => events.every(event => event.data.id !== todo.id));
}

module.exports = {
  replay
};
