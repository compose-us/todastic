function replay(events) {
  const todos = events.reduce((todos, event) => {
    switch (event.eventType) {
      case "ADDED_TODO":
        return addTodo(todos, event.data);
      case "REMOVED_TODO":
        return removeTodo(todos, event.data);
      case "CHANGED_TODO":
        if (event.data.parentId !== undefined) {
          const result = moveTodo(todos, event);
          if (result.moved) {
            return result.result;
          }
        }
        return changedTodo(todos, event.data);
      default:
        return todos;
    }
  }, []);
  return { todos };
}

function moveTodo(todos, event) {
  const todoInOldTree = findTodo(todos, event.data.todoId);
  if (event.data.parentId === null) {
    const result = moveTodoToFirstLevel(todos, todoInOldTree, event);
    return { moved: true, result };
  }
  const newParentIsChild = isIdInTodos([todoInOldTree], event.data.parentId);
  if (newParentIsChild) {
    return { moved: true, result: todos };
  }
  if (!todoInOldTree.parentId) {
    const result = [...movedTodo(todos, todoInOldTree, event.data)].filter(t => t.todoId !== todoInOldTree.todoId);
    return { moved: true, result };
  }
  if (event.data.parentId !== todoInOldTree.parentId) {
    return { moved: true, result: movedTodo(todos, todoInOldTree, event.data) };
  }
  return { moved: false };
}

function moveTodoToFirstLevel(todos, todoInOldTree, event) {
  const todoInOldTreeWithoutParentId = { ...todoInOldTree };
  delete todoInOldTreeWithoutParentId["parentId"];
  return [...removeTodo(todos, event.data), todoInOldTreeWithoutParentId];
}

function addTodo(todos, todoToAdd) {
  todoToAdd.children = todoToAdd.children || [];
  if (todoToAdd.parentId) {
    return todos.map(todo => appendChild(todo, todoToAdd));
  }
  return [...todos, todoToAdd];
}

function appendChild(todo, todoToAdd) {
  if (todoToAdd.parentId === todo.todoId) {
    return {
      ...todo,
      children: [...(todo.children || []), todoToAdd]
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

function isIdInTodos(todos, parentId) {
  return todos.some(todo => todo.todoId === parentId || isIdInTodos(todo.children || [], parentId));
}

function movedTodo(todos, todoInOldTree, data) {
  return todos.map(todo => {
    // add todo in new place
    if (data.parentId === todo.todoId) {
      return {
        ...todo,
        children: [...movedTodo(todo.children || [], todoInOldTree, data), { ...todoInOldTree, ...data }]
      };
    }
    // remove old todo
    if (todoInOldTree.parentId === todo.todoId) {
      const indexOfOldChild = todo.children.indexOf(todoInOldTree);
      todo.children.splice(indexOfOldChild, 1);
      const newChildren = [].concat(movedTodo(todo.children, todoInOldTree, data));
      return {
        ...todo,
        children: newChildren
      };
    }
    // check children for adding new or removing old todo
    return {
      ...todo,
      children: movedTodo(todo.children || [], todoInOldTree, data)
    };
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

module.exports = replay;
