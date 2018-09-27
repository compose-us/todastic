module.exports = { moveTodo };

function moveTodo(todos, event) {
  const oldNode = findTodo(todos, event.data.todoId);
  const position = event.data.position;
  const newParentId = event.data.parentId;
  const newParentIsChild = isIdInTodos([oldNode], newParentId);
  if (newParentIsChild) {
    return todos;
  }

  const treeWithoutOldNode = detachFromParent(todos, oldNode, newParentId);
  return attachToNewParent(treeWithoutOldNode, oldNode, position, newParentId);
}

function detachFromParent(todos, oldNode, newParentId) {
  // has it been a root node?
  if (oldNode.parentId === null || oldNode.parentId === undefined) {
    return removeFromBranch(todos, oldNode.todoId);
  }
  const oldParent = findTodo(todos, oldNode.parentId);
  oldParent.children = removeFromBranch(oldParent.children, oldNode.todoId);
  return replaceNode(todos, oldParent.todoId, oldParent);
}

function attachToNewParent(todos, oldNode, position, newParentId) {
  // update the node values to reflect its new place
  oldNode.position = position;
  // is it gonna be a root node?
  if (newParentId === null || newParentId === undefined) {
    delete oldNode["parentId"];
    return insertIntoBranch(todos, oldNode, position);
  }
  oldNode.parentId = newParentId;
  const newParent = findTodo(todos, newParentId);
  newParent.children = insertIntoBranch(newParent.children, oldNode, position);
  return replaceNode(todos, newParent);
}

function removeFromBranch(branch, todoId) {
  return branch.filter(x => x.todoId !== todoId).map((x, idx) => ({ ...x, position: idx }));
}

function insertIntoBranch(branch, todo, position) {
  const head = branch.slice(0, position);
  const tail = branch.slice(position, branch.length);
  const tailWithNewPositions = tail.map(x => ({
    ...x,
    position: x.position + 1
  }));
  return [...head, todo, ...tailWithNewPositions];
}

function replaceNode(todos, newNode) {
  return todos.map(todo => {
    if (todo.todoId === newNode.todoId) {
      return newNode;
    } else {
      todo.children = replaceNode(todo.children, newNode);
      return todo;
    }
  });
}

function findTodo(todos, todoId) {
  for (let todo of todos) {
    if (todo.todoId === todoId) {
      return todo;
    }
    const found = findTodo(todo.children, todoId);
    if (found) {
      return found;
    }
  }
  return;
}

function isIdInTodos(todos, parentId) {
  return todos.some(todo => todo.todoId === parentId || isIdInTodos(todo.children, parentId));
}
