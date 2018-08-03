const storage = require("./storage");

describe("Storage", () => {
  describe("loading of files", () => {
    it("will throw an error if file is missing", async () => {
      const fp = `${__dirname}/__test__/missing.todo`;
      await expect(storage.load(fp)).rejects.toThrow(/missing/i);
    });

    it("will throw an error if file is in a wrong format", async () => {
      const fp = `${__dirname}/__test__/wrong-format.todo`;
      await expect(storage.load(fp)).rejects.toThrow(/format/i);
    });

    it("will throw an error if the subtasks are wrongly nested", async () => {
      const fp = `${__dirname}/__test__/wrong-format-nested.todo`;
      await expect(storage.load(fp)).rejects.toThrow(/format/i);
    });

    it("will not throw errors if file is empty", async () => {
      const fp = `${__dirname}/__test__/empty.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBe(0);
    });

    it("can load a simple file without errors", async () => {
      const fp = `${__dirname}/__test__/simple-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBeGreaterThan(0);
    });

    it("can load a file with subtasks without errors", async () => {
      const fp = `${__dirname}/__test__/dependent-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBeGreaterThan(0);
    });

    it("can load a file with a lot of subtasks without errors", async () => {
      const fp = `${__dirname}/__test__/nested-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBeGreaterThan(0);
    });

    it("can load a more complex file with subtasks, labels, tracked time and more", async () => {
      const fp = `${__dirname}/__test__/complex-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBeGreaterThan(0);
    });
  });

  describe("understands todo format", () => {
    it("retrieves a list of objects", async () => {
      const fp = `${__dirname}/__test__/simple-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBe(3);
      store.todos.forEach(todo => {
        expect(todo.status).toBeDefined();
        expect(todo.title).toBeDefined();
        expect(todo.tags).toBeDefined();
      });
    });

    it("understands the title of a todo", async () => {
      const fp = `${__dirname}/__test__/simple-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBe(3);
      expect(store.todos[0].title).toEqual("this is a sample");
      expect(store.todos[1].title).toEqual("with three tasks");
      expect(store.todos[2].title).toEqual("and not more");
    });

    it("understands the status of the various todos", async () => {
      const fp = `${__dirname}/__test__/status-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBe(3);
      expect(store.todos[0].status).toEqual("open");
      expect(store.todos[1].status).toEqual("done");
      expect(store.todos[2].status).toEqual("n/a");
    });

    it("can return an unknown status", async () => {
      const fp = `${__dirname}/__test__/wrong-status.todo`;
      await expect(storage.load(fp)).rejects.toThrow(/status/i);
    });

    it("understands the tags of the various todos", async () => {
      const fp = `${__dirname}/__test__/simple-tags-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBe(3);
      expect(store.todos[0].tags).toEqual(["TRACK 00:30:00, Narigo, 2018-05-25 08:45:34"]);
      expect(store.todos[1].tags).toEqual(["ASSIGN Narigo, 2018-05-25 08:56:23"]);
      expect(store.todos[2].tags).toEqual(["LABEL Development"]);
    });

    it("can read multiple tags in one todo", async () => {
      const fp = `${__dirname}/__test__/multiple-tags-sample.todo`;
      const store = await storage.load(fp);
      expect(store.todos.length).toBe(3);
      expect(store.todos[0].tags).toEqual([
        "TRACK 00:30:00, Narigo, 2018-05-25 08:45:34",
        "TRACK 00:30:15, Narigo, 2018-05-25 09:15:49"
      ]);
      expect(store.todos[1].tags).toEqual(["ASSIGN Narigo, 2018-05-25 08:56:23"]);
      expect(store.todos[2].tags).toEqual([
        "LABEL Development",
        "LABEL Business",
        "ASSIGN Narigo, 2018-05-25 08:56:24"
      ]);
    });
  });
});
