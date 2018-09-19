function replay(events) {
  const todos = events.reduce((todos, event) => {
    if (event.eventType === "ADDED_TODO") {
      return addTodo(todos, event.data);
    } else if (event.eventType === "REMOVED_TODO") {
      return removeTodo(todos, event.data);
    } else if (event.eventType === "CHANGED_TODO") {
      if (event.data.parentId !== undefined) {
        const todoInOldTree = findTodo(todos, event.data.todoId);
        if (event.data.parentId === null) {
          const todoInOldTreeWithoutParentId = { ...todoInOldTree };
          delete todoInOldTreeWithoutParentId["parentId"];
          return [...removeTodo(todos, event.data), todoInOldTreeWithoutParentId];
        }
        if (!todoInOldTree.parentId) {
          return [...movedTodo(todos, todoInOldTree, event.data)].filter(t => t.todoId !== todoInOldTree.todoId);
        }
        if (event.data.parentId !== todoInOldTree.parentId) {
          return movedTodo(todos, todoInOldTree, event.data);
        }
      }
      return changedTodo(todos, event.data);
    }
    return todos;
  }, []);
  return { todos };
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
