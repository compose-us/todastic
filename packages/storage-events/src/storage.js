function replay(events) {
  const parents = events.map(event => event.data).filter(event => event.parentId === undefined);
  const children = events.map(event => event.data).filter(event => event.parentId !== undefined);
  const todos = parents;
  children.forEach(todo => {
    const foundParent = parents.find(parent => parent.id === todo.parentId);
    foundParent.children = foundParent.children || [];
    foundParent.children.push(todo);
  });
  return { todos };
}

module.exports = {
  replay
};
