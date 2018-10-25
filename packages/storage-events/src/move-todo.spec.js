const replay = require("./replay.js");
const log = require("./__mocks__/duplicated-todos-through-move.js");
const log2 = require("./__mocks__/duplicated-todos-through-undefined-position-move.js");

describe("bugs", () => {
  it("does not duplicate on move", () => {
    const state = replay(log);
    expect(state.todos).toMatchSnapshot();
  });

  it("does not duplicate on move to root without position", () => {
    const state = replay(log2);
    expect(state.todos).toMatchSnapshot();
  });
});
