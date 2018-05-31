const storage = require("../packages/storage-file");
const dashboard = require("../packages/dashboard");

describe("integration test - saved tasks to relevant information", () => {
  it("tasks can be grouped by status", () => {
    const groupedTasks = dashboard.groupByStatus(storage.load("./status-sample.todo"));
    expect(groupedTasks["open"].length).toBe(1);
    expect(groupedTasks["closed"].length).toBe(1);
    expect(groupedTasks["n/a"].length).toBe(1);
  });
});
