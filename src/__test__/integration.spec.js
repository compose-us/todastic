const storage = require("../server/storage");
const dashboard = require("../common/dashboard");

describe.skip("integration test - saved tasks to relevant information", () => {
  it("tasks can be grouped by status", () => {
    const groupedTasks = dashboard.groupByStatus(storage.load("./status-sample"));
    expect(groupedTasks["open"].length).toBe(1);
    expect(groupedTasks["closed"].length).toBe(1);
    expect(groupedTasks["n/a"].length).toBe(1);
  });
});
