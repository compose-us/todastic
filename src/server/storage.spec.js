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
});
