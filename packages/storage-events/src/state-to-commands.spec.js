const complexTest = require("./__mocks__/state-to-commands-add-todo-complex.json");
const stateToCommands = require("./state-to-commands.js");

describe("stateToCommands", () => {
  it("returns an empty list for empty state", () => {
    expect(stateToCommands([])).toEqual([]);
  });

  it("returns a single ADD_TODO for a single todo", () => {
    const myTodos = [{ children: [], todoId: "1", labels: [], position: 0, status: "open", title: "Test title" }];
    const expected = [
      {
        type: "ADD_TODO",
        data: { children: [], labels: [], parentId: null, position: 0, status: "open", title: "Test title" }
      }
    ];
    expect(stateToCommands(myTodos)).toEqual(expected);
  });

  it("returns multiple ADD_TODO commands for multiple todos", () => {
    const myTodos = [
      { children: [], todoId: "1", labels: [], position: 0, status: "open", title: "One" },
      { children: [], todoId: "2", labels: [], position: 1, status: "open", title: "Two" }
    ];
    const expected = [
      {
        type: "ADD_TODO",
        data: { children: [], labels: [], parentId: null, position: 0, status: "open", title: "One" }
      },
      {
        type: "ADD_TODO",
        data: { children: [], labels: [], parentId: null, position: 1, status: "open", title: "Two" }
      }
    ];
    expect(stateToCommands(myTodos)).toEqual(expected);
  });

  it("returns correct ADD_TODO commands for child todos", () => {
    const myTodos = [
      {
        children: [{ children: [], todoId: "1-1", labels: [], position: 0, status: "open", title: "One-One" }],
        todoId: "1",
        labels: [],
        position: 0,
        status: "open",
        title: "One"
      }
    ];
    const expected = [
      {
        type: "ADD_TODO",
        data: {
          children: [{ children: [], labels: [], position: 0, status: "open", title: "One-One" }],
          labels: [],
          parentId: null,
          position: 0,
          status: "open",
          title: "One"
        }
      }
    ];
    expect(stateToCommands(myTodos)).toEqual(expected);
  });

  it("returns working complex ADD_TODO commands", () => {
    expect(stateToCommands(complexTest)).toMatchSnapshot();
  });

  it("returns working complex ADD_TODO commands with parentId", () => {
    expect(stateToCommands(complexTest, "id-0")).toMatchSnapshot();
  });
});
