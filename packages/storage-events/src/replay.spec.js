const replay = require("./replay.js");

describe("replay", () => {
  describe("unknown events", () => {
    it("should ignore events it does not recognize", () => {
      const events = [{ eventType: "UNKNOWN_TODO", data: { todoId: "id-1", title: "unknown todo" } }];
      const state = replay(events);
      expect(state.todos.length).toEqual(0);
    });
  });

  describe("REMOVED_TODO event", () => {
    it("can remove an added todo", () => {
      // prettier-ignore
      const events = [
        { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a parent todo" } },
        { eventType: "REMOVED_TODO", data: { todoId: "id-1" } }
      ];
      const state = replay(events);
      expect(state.todos.length).toEqual(0);
    });

    it("can remove multiple todos", () => {
      // prettier-ignore
      const events = [
        { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a parent todo" } },
        { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Create a second parent todo" } },
        { eventType: "ADDED_TODO", data: { todoId: "id-3", title: "Create a third parent todo" } },
        { eventType: "REMOVED_TODO", data: { todoId: "id-1" } },
        { eventType: "REMOVED_TODO", data: { todoId: "id-3" } }
      ];
      const state = replay(events);
      expect(state.todos.length).toEqual(1);
      expect(state.todos[0].title).toEqual("Create a second parent todo");
    });

    it("can remove a todo and re-add it afterwards", () => {
      // prettier-ignore
      const events = [
        { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a parent todo" } },
        { eventType: "REMOVED_TODO", data: { todoId: "id-1" } },
        { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a parent todo" } }
      ];
      const state = replay(events);
      expect(state.todos.length).toEqual(1);
      expect(state.todos[0].title).toEqual("Create a parent todo");
    });

    it("removing a parent todo makes its children disappear", () => {
      // prettier-ignore
      const events = [
        { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a parent todo" } },
        { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Create a child for the parent todo", parentId: "id-1" } },
        { eventType: "REMOVED_TODO", data: { todoId: "id-1" } }
      ];
      const state = replay(events);
      expect(state.todos.length).toEqual(0);
    });

    it("can remove a child todo", () => {
      // prettier-ignore
      const events = [
        { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a parent todo" } },
        { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Create a child for the parent todo", parentId: "id-1" } },
        { eventType: "ADDED_TODO", data: { todoId: "id-3", title: "Create another child for the parent todo", parentId: "id-1" } },
        { eventType: "REMOVED_TODO", data: { todoId: "id-3" } }
      ];
      const state = replay(events);
      expect(state.todos.length).toEqual(1);
      expect(state.todos[0].children.length).toEqual(1);
    });
  });

  describe("editing todos", () => {
    describe("EDITING_TODO", () => {
      it("does not care in the store about intermediate edits", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
          { eventType: "EDITING_TODO", data: { todoId: "id-1", title: "Changing the todo" } },
          { eventType: "EDITING_TODO", data: { todoId: "id-1", title: "Still changing the todo" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(1);
        expect(state.todos[0]).toMatchSnapshot();
      });
    });

    describe("CHANGED_TODO", () => {
      it("will change the todos when the edit is done", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
          { eventType: "EDITING_TODO", data: { todoId: "id-1", title: "Changing the todo" } },
          { eventType: "CHANGED_TODO", data: { todoId: "id-1", title: "Changed the todo" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(1);
        expect(state.todos[0]).toMatchSnapshot();
      });

      it("can edit child todos", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "CHANGED_TODO", data: { todoId: "id-2", title: "Changed title of child" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(1);
        expect(state.todos).toMatchSnapshot();
      });

      it("preserves labels", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", labels: [{ name: "#all", args: [] }, { name: "#there", args: [] }] } },
          { eventType: "CHANGED_TODO", data: { todoId: "id-1", status: "done" } },
          { eventType: "CHANGED_TODO", data: { todoId: "id-1", status: "open" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(1);
        expect(state.todos[0].labels).toEqual([{ name: "#all", args: [] }, { name: "#there", args: [] }]);
      });

      it("can replay changes in a child", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", position: 1, data: { title: "do it", todoId: "a0ca6051-43f9-410e-86c9-75ae37a1c682" } },
          { eventType: "ADDED_TODO", position: 2, data: { title: "really", parentId: "a0ca6051-43f9-410e-86c9-75ae37a1c682", todoId: "6505d361-adc2-427f-ad45-a4e57b630830" } },
          { eventType: "ADDED_TODO", position: 3, data: { title: "some other", todoId: "536540b4-6602-4242-ad2c-f199f49b7862" } },
          { eventType: "CHANGED_TODO", position: 4, data: { title: "really really real", todoId: "6505d361-adc2-427f-ad45-a4e57b630830" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos[0]).toMatchSnapshot();
      });

      it("only edits the things provided in data and does not touch other fields", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", parentId: "id-1" } },
          { eventType: "CHANGED_TODO", data: { todoId: "id-2", title: "Changed title of child but did not change parentId" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(1);
        expect(state.todos).toMatchSnapshot();
      });

      it("can move subtasks to other parents", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2-1", title: "Added a child", parentId: "id-2", position: 0 } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1-1", parentId: "id-2", position: 1 } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      it("moves subtasks from subtasks to different parents in other trees", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2-1", title: "Added a child", parentId: "id-1-2", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2-2", title: "Added a child", parentId: "id-1-2", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2-1", title: "Added a child", parentId: "id-2", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2-2", title: "Added a child", parentId: "id-2", position: 1 } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1-2-2", parentId: "id-2-1", position: 0 } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      it("works when moving a todo up", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-1", title: "Added a child", parentId: "id-1-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", position: 1 } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1-1-1", parentId: "id-1", position: 1 } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      it("works when moving a todo down", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-1", title: "Added a child", parentId: "id-1", position: 2 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", position: 1 } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1-1-1", parentId: "id-1-1", position: 1 } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      it("can move into root scope", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-1", title: "Added a child", parentId: "id-1-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", position: 1 } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1-1-1", parentId: null, position: 2 } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(3);
        expect(state.todos).toMatchSnapshot();
      });

      it("can move from root scope", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-3", title: "Added a child", position: 2 } },
          { eventType: "MOVED_TODO", data: { todoId: "id-3", parentId: "id-1-1", position: 1 } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      it("can move from root to root scope", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-3", title: "Created another todo", position: 2 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1", position: 0 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1", position: 1 } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child", position: 1 } },
          { eventType: "MOVED_TODO", data: { todoId: "id-3", parentId: null, position: 1 } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(3);
        expect(state.todos).toMatchSnapshot();
      });

      it("will not move itself into itself", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-1", title: "Added a child", parentId: "id-1-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child" } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1-1", parentId: "id-1-1" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      it("will not move itself into a child of itself", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-1", title: "Added a child", parentId: "id-1-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child" } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1-1", parentId: "id-1-1-1" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      it("will not move itself into a grandchild of itself", () => {
        // prettier-ignore
        const events = [
          { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Added a child", parentId: "id-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-1", title: "Added a child", parentId: "id-1-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-1-2", title: "Added a child", parentId: "id-1-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Added a child", parentId: "id-1" } },
          { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Added a child" } },
          { eventType: "MOVED_TODO", data: { todoId: "id-1", parentId: "id-1-1-1" } }
        ];
        const state = replay(events);
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toMatchSnapshot();
      });

      describe("position sorting", () => {
        it("can move the position from root level", () => {
          // prettier-ignore
          const events = [
            { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
            { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Another todo" } },
            { eventType: "ADDED_TODO", data: { todoId: "id-3", title: "Yet another todo" } },
            { eventType: "ADDED_TODO", data: { todoId: "id-4", title: "Yet another todo 2" } },
            { eventType: "MOVED_TODO", data: { todoId: "id-3", position: 0, parentId: "id-2" } },
            { eventType: "MOVED_TODO", data: { todoId: "id-4", position: 1, parentId: "id-2" } }
          ];
          const state = replay(events);
          expect(state.todos.length).toEqual(2);
          expect(state.todos).toMatchSnapshot();
        });
        it("can move the position on root level", () => {
          // prettier-ignore
          const events = [
            { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo" } },
            { eventType: "ADDED_TODO", data: { todoId: "id-2", title: "Another todo" } },
            { eventType: "MOVED_TODO", data: { todoId: "id-2", position: 0, parentId: null } }
          ];
          const state = replay(events);
          expect(state.todos.length).toEqual(2);
          expect(state.todos).toMatchSnapshot();
        });
        it("can move the position attribute on child level", () => {
          // prettier-ignore
          const events = [
            { eventType: "ADDED_TODO", data: { todoId: "id-1", title: "Create a todo", position: 0 } },
            { eventType: "ADDED_TODO", data: { todoId: "id-1-1", title: "Create a sub todo", position: 0, parentId: "id-1" } },
            { eventType: "ADDED_TODO", data: { todoId: "id-1-2", title: "Create another sub todo", position: 1, parentId: "id-1" } },
            { eventType: "MOVED_TODO", data: { todoId: "id-1-2", position: 0, parentId: "id-1" } }
          ];
          const state = replay(events);
          expect(state.todos.length).toEqual(1);
          expect(state.todos).toMatchSnapshot();
        });
      });
    });
  });
});
