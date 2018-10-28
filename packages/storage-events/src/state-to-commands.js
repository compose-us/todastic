module.exports = stateToCommands;

function stateToCommands(listOfTodos, parentId = null) {
  return listOfTodos.map(todoToEvent(parentId));
}

const todoToEvent = parentId => todo => {
  const data = dataFromTodo(todo);
  return {
    command: "ADD_TODO",
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
