const stateToCommands = require("./state-to-commands.js");

describe("stateToCommands", () => {
  it("returns an empty list for empty state", () => {
    expect(stateToCommands([])).toEqual([]);
  });

  it("returns a single ADDED_TODO for a single todo", () => {
    // prettier-ignore
    const myTodos = [ { children: [], todoId: "5bce72e9986417accf87547e-id-1-1-2", labels: [], position: 0, status: "open", title: "Test title" } ];
    // prettier-ignore
    const expected = [ { type: "ADD_TODO", data: { children: [], labels: [], parentId: null, position: 0, status: "open", title: "Test title" } } ];
    expect(stateToCommands(myTodos)).toEqual(expected);
  });
});
