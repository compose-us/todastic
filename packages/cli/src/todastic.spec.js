const todastic = require("./todastic");

describe("command line interface", () => {
  it("can load a file and output information", async () => {
    await expect(todastic(`${__dirname}/__tests__/sample.todo`).tracked()).resolves.toEqual("03:30:00");
  });
});
