const replay = require("./replay.js");
const log = require("./todos-log.js");

describe("bugs", () => {
  it("does not duplicate on move", () => {
    const state = replay(log);
    expect(state.todos).toMatchSnapshot();
  });
});
