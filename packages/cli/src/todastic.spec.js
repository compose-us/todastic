const todastic = require("./todastic");

describe("command line interface", () => {
  it("can load a file and output information", async () => {
    await expect(todastic(`${__dirname}/__tests__/sample.todo`).tracked()).resolves.toEqual("03:30:00");
  });

  it("can filter by a specific status", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample.todo`).tracked({ filter: { status: ["done"] } })
    ).resolves.toMatchSnapshot();
  });

  it("does not filter if no filter is set", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample.todo`).tracked({ filter: {} })
    ).resolves.toMatchSnapshot();
  });

  it("returns an empty result when filtering for an unused status", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample.todo`).tracked({ filter: { status: ["n/a"] } })
    ).resolves.toMatchSnapshot();
  });
});
