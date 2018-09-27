module.exports = { moveTodo };

function moveTodo(todos, event) {
  const oldNode = findTodo(todos, event.data.todoId);
  const position = event.data.position;
  const newParentId = event.data.parentId;
  const newParentIsChild = isIdInTodos([oldNode], newParentId);
  if (newParentIsChild) {
    return todos;
  }

  todos = detachFromParent(todos, oldNode, newParentId);
  todos = attachToNewParent(todos, oldNode, position, newParentId);

  return todos;
}

function detachFromParent(todos, oldNode, newParentId) {
  // has it been a root node?
  if (oldNode.parentId === null || oldNode.parentId === undefined) {
    todos = removeFromBranch(todos, oldNode.todoId);
  } else {
    const oldParent = findTodo(todos, oldNode.parentId);
    oldParent.children = removeFromBranch(oldParent.children, oldNode.todoId);
    todos = replaceNode(todos, oldParent.todoId, oldParent);
  }
  return todos;
}

function attachToNewParent(todos, oldNode, position, newParentId) {
  // update the node values to reflect its new place
  oldNode.position = position;
  // is it gonna be a root node?
  if (newParentId === null || newParentId === undefined) {
    delete oldNode["parentId"];
    todos = insertIntoBranch(todos, oldNode, position);
  } else {
    oldNode.parentId = newParentId;
    const newParent = findTodo(todos, newParentId);
    newParent.children = insertIntoBranch(newParent.children, oldNode, position);
    todos = replaceNode(todos, newParent);
  }
  return todos;
}

function removeFromBranch(branch, todoId) {
  branch.sort(positionSortFunction);
  let result = branch.filter(x => x.todoId != todoId);
  // adjust position values
  for (let i = 0; i < result.length; i++) {
    result[i].position = i;
  }
  return result.sort(positionSortFunction);
}

function insertIntoBranch(branch, todo, position) {
  const head = branch.slice(0, position);
  const tail = branch.slice(position, branch.length);
  const tailWithNewPositions = tail.map(x => {
    x.position += 1;
    return x;
  });
  return [...head, todo, ...tailWithNewPositions];
}

function positionSortFunction(a, b) {
  return a.position - b.position;
}

function replaceNode(todos, newNode) {
  return todos.map(todo => {
    if (todo.todoId === newNode.todoId) {
      return newNode;
    } else {
      if (todo.children) {
        todo.children = replaceNode(todo.children, newNode);
      }
      return todo;
    }
  });
}

function findTodo(todos, todoId) {
  for (let todo of todos) {
    if (todo.todoId === todoId) {
      return todo;
    }
    if (todo.children) {
      const found = findTodo(todo.children, todoId);
      if (found) {
        return found;
      }
    }
  }
  return;
}

function isIdInTodos(todos, parentId) {
  return todos.some(todo => todo.todoId === parentId || isIdInTodos(todo.children || [], parentId));
}
