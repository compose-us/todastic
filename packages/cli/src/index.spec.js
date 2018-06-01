const todastic = require("./index");

describe.skip("command line interface", () => {
  it("can load a file and output information", () => {
    expect(todastic(`${__dirname}/__tests__/sample.todo`).tracked()).toEqual(3 * 60 * 60 + 30 * 60);
  });
});
