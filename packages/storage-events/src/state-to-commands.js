module.exports = stateToCommands;

function stateToCommands(listOfTodos) {
  return listOfTodos.map(todoToEvent(null));
}

const todoToEvent = parentId => todo => {
  const data = dataFromTodo(todo);
  return {
    type: "ADD_TODO",
    data: { ...data, parentId }
  };
};

const dataFromTodo = todo => {
  const { todoId, children, ...rest } = todo;
  return {
    ...rest,
    children: children.map(dataFromTodo)
  };
};
