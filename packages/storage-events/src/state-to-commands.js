module.exports = stateToCommands;

function stateToCommands(listOfTodos) {
  return listOfTodos.map(todoToEvent(null));
}

const todoToEvent = parentId => todo => {
  const { todoId, ...rest } = todo;
  return {
    type: "ADD_TODO",
    data: {
      ...rest,
      parentId
    }
  };
};
