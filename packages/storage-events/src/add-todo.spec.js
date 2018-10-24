const { addTodo } = require("./add-todo.js");

describe("ADDED_TODO event", () => {
  const replay = events => events.reduce((todos, event) => addTodo(todos, event), []);

  it("replays to an empty storage if no events are given", () => {
    const todos = replay([]);
    expect(todos.length).toEqual(0);
  });

  it("can add a task to a store through the ADDED_TODO event", () => {
    const event = { todoId: "id-1", title: "Implement event sourcing" };
    const todos = replay([event]);
    expect(todos.length).toBe(1);
    expect(todos[0].title).toEqual("Implement event sourcing");
  });

  it("initializes an added todo with an empty children array", () => {
    const event = { todoId: "id-1", title: "Implement event sourcing" };
    const todos = replay([event]);
    expect(todos.length).toBe(1);
    expect(todos[0].children).toBeDefined();
  });

  it("can add a task as a child of another task", () => {
    // prettier-ignore
    const events = [
      { todoId: "id-1", title: "Create a parent todo" } ,
      { todoId: "id-2", title: "Create a child todo", parentId: "id-1" } 
    ];
    const todos = replay(events);
    expect(todos.length).toBe(1);
    expect(todos[0].title).toEqual("Create a parent todo");
    expect(todos[0].children[0].title).toEqual("Create a child todo");
  });

  it("can add child todo to any parent", () => {
    // prettier-ignore
    const events = [
      { todoId: "id-1", title: "Create a parent todo" } ,
      { todoId: "id-2", title: "Create another parent todo" } ,
      { todoId: "id-3", title: "Create a child todo in parent 2", parentId: "id-2" } 
    ];
    const todos = replay(events);
    expect(todos.length).toBe(2);
    expect(todos[0].title).toEqual("Create a parent todo");
    expect(todos[1].title).toEqual("Create another parent todo");
    expect(todos[1].children[0].title).toEqual("Create a child todo in parent 2");
  });

  it("can add multiple children to a parent", () => {
    // prettier-ignore
    const events = [
      { todoId: "id-1", title: "Create a parent todo" } ,
      { todoId: "id-2", title: "Create a child todo in parent", parentId: "id-1" } ,
      { todoId: "id-3", title: "Create another child todo in parent", parentId: "id-1" } 
    ];
    const todos = replay(events);
    expect(todos.length).toBe(1);
    expect(todos[0].title).toEqual("Create a parent todo");
    expect(todos[0].children[0].title).toEqual("Create a child todo in parent");
    expect(todos[0].children[1].title).toEqual("Create another child todo in parent");
  });

  it("can add todos in a more complex example", () => {
    // prettier-ignore
    const events = [
      { todoId: "id-1", title: "Create a parent todo" } ,
      { todoId: "id-2", title: "Create another parent todo" } ,
      { todoId: "id-3", title: "Create a child in another parent todo", parentId: "id-2" } ,
      { todoId: "id-4", title: "Create a third parent todo" } ,
      { todoId: "id-5", title: "Create another child todo in parent 2", parentId: "id-2" } 
    ];
    const todos = replay(events);
    expect(todos).toMatchSnapshot();
  });

  it("can add todos as children of children", () => {
    // prettier-ignore
    const events = [
      { todoId: "id-1", title: "Create a parent todo" } ,
      { todoId: "id-2", title: "Create another parent todo" } ,
      { todoId: "id-3", title: "Create a child in another parent todo", parentId: "id-2" } ,
      { todoId: "id-4", title: "Create a third parent todo" } ,
      { todoId: "id-5", title: "Create a child todo of child of parent 2", parentId: "id-3" } ,
      { todoId: "id-6", title: "Create a second child todo of child of parent 2", parentId: "id-3" } ,
      { todoId: "id-7", title: "Create a child of 2nd child of child of parent 2", parentId: "id-6" } 
    ];
    const todos = replay(events);
    expect(todos.length).toEqual(3);
    expect(todos[1].children.length).toEqual(1);
    expect(todos[1].children[0].children.length).toEqual(2);
    expect(todos[1].children[0].children[1].children.length).toEqual(1);
    expect(todos).toMatchSnapshot();
  });

  it("can add children at the correct position", () => {
    // prettier-ignore
    const events = [
      { todoId: "id-1", title: "Create a parent todo" } ,
      { todoId: "id-1-1", title: "Create child 1", parentId: "id-1" } ,
      { todoId: "id-1-2", title: "Create child 2", parentId: "id-1" } 
    ];
    const todos = replay(events);
    expect(todos).toMatchSnapshot();
  });

  it("can add root nodes at the correct position", () => {
    // prettier-ignore
    const events = [
      { todoId: "id-1", title: "Create a parent todo" } ,
      { todoId: "id-2", title: "Create other parent" } 
    ];
    const todos = replay(events);
    expect(todos).toMatchSnapshot();
  });
});
