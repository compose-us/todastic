const storage = require("./storage.js");

describe("storage-events", () => {
  it("replays to an empty storage if no events are given", () => {
    const state = storage.replay([]);
    expect(state.todos.length).toEqual(0);
  });

  it("can add a task to a store through the ADDED_TODO event", () => {
    const event = { event: "ADDED_TODO", data: { id: 1, title: "Implement event sourcing" } };
    const state = storage.replay([event]);
    expect(state.todos.length).toBe(1);
    expect(state.todos[0].title).toEqual("Implement event sourcing");
  });

  it("can add a task as a child of another task", () => {
    const events = [
      { event: "ADDED_TODO", data: { id: 1, title: "Create a parent todo" } },
      { event: "ADDED_TODO", data: { id: 2, title: "Create a child todo", parentId: 1 } }
    ];
    const state = storage.replay(events);
    expect(state.todos.length).toBe(1);
    expect(state.todos[0].title).toEqual("Create a parent todo");
    expect(state.todos[0].children[0].title).toEqual("Create a child todo");
  });

  it("can add child todo to any parent", () => {
    const events = [
      { event: "ADDED_TODO", data: { id: 1, title: "Create a parent todo" } },
      { event: "ADDED_TODO", data: { id: 2, title: "Create another parent todo" } },
      { event: "ADDED_TODO", data: { id: 3, title: "Create a child todo in parent 2", parentId: 2 } }
    ];
    const state = storage.replay(events);
    expect(state.todos.length).toBe(2);
    expect(state.todos[0].title).toEqual("Create a parent todo");
    expect(state.todos[1].title).toEqual("Create another parent todo");
    expect(state.todos[1].children[0].title).toEqual("Create a child todo in parent 2");
  });
});
