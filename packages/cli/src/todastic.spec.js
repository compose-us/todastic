const todastic = require("./todastic");

describe("command line interface", () => {
  it("can load a file and output information", async () => {
    await expect(todastic(`${__dirname}/__tests__/sample.todo`).tracked()).resolves.toEqual("03:30:00");
  });

  it("can filter by a specific status", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample.todo`)
        .filter({ status: ["done"] })
        .tracked()
    ).resolves.toMatchSnapshot();
  });

  it("returns an empty result when filtering for an unused status", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample.todo`)
        .filter({ status: ["n/a"] })
        .tracked()
    ).resolves.toMatchSnapshot();
  });

  it("does not filter if no filters are set", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample2.todo`)
        .filter({})
        .tracked()
    ).resolves.toMatchSnapshot();
  });

  it("does not filter if no filter config is passed", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample2.todo`)
        .filter()
        .tracked()
    ).resolves.toMatchSnapshot();
  });

  it("can filter by a multiple status", async () => {
    await expect(
      todastic(`${__dirname}/__tests__/filter-sample2.todo`)
        .filter({ status: ["done", "n/a"] })
        .tracked()
    ).resolves.toMatchSnapshot();
  });
});
