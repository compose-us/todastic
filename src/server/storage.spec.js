const storage = require("./storage");

describe("Storage", () => {
  it("will throw an error if file is missing", async () => {
    const fp = `${__dirname}/__test__/missing.todo`;
    expect.assertions(1);
    await expect(storage.load(fp)).rejects.toThrow(/missing/i);
  });

  it("will throw an error if file is in a wrong format", async () => {
    const fp = `${__dirname}/__test__/wrong-format.todo`;
    expect.assertions(1);
    await expect(storage.load(fp)).rejects.toThrow(/format/i);
  });

  it("will not throw errors if file is empty", async () => {
    const fp = `${__dirname}/__test__/empty.todo`;
    const store = await storage.load(fp);
    expect(store.todos.length).toBe(0);
  });

  it("can load a simple file without errors", async () => {
    const fp = `${__dirname}/__test__/sample.todo`;
    const store = await storage.load(fp);
    expect(store.todos.length).toBeGreaterThan(0);
  });

});
