const { execSync } = require("child_process");

describe("command line interface", () => {
  it("can track time", async () => {
    expect(
      execSync(`node ${__dirname}/cli.js track ${__dirname}/__tests__/filter-sample.todo`).toString()
    ).toMatchSnapshot();
  });
});
