const storage = require("./storage.js");

describe("storage-events", () => {
  describe("ADDED_TODO event", () => {
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

    it("can add multiple children to a parent", () => {
      const events = [
        { event: "ADDED_TODO", data: { id: 1, title: "Create a parent todo" } },
        { event: "ADDED_TODO", data: { id: 2, title: "Create a child todo in parent", parentId: 1 } },
        { event: "ADDED_TODO", data: { id: 3, title: "Create another child todo in parent", parentId: 1 } }
      ];
      const state = storage.replay(events);
      expect(state.todos.length).toBe(1);
      expect(state.todos[0].title).toEqual("Create a parent todo");
      expect(state.todos[0].children[0].title).toEqual("Create a child todo in parent");
      expect(state.todos[0].children[1].title).toEqual("Create another child todo in parent");
    });

    it("can add todos in a pretty complex example", () => {
      const events = [
        { event: "ADDED_TODO", data: { id: 1, title: "Create a parent todo" } },
        { event: "ADDED_TODO", data: { id: 2, title: "Create another parent todo" } },
        { event: "ADDED_TODO", data: { id: 3, title: "Create a child in another parent todo", parentId: 2 } },
        { event: "ADDED_TODO", data: { id: 4, title: "Create a third parent todo" } },
        { event: "ADDED_TODO", data: { id: 5, title: "Create another child todo in parent 2", parentId: 2 } }
      ];
      const state = storage.replay(events);
      expect(state.todos).toMatchSnapshot();
    });
  });
});
