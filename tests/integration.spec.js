const path = require("path");
const storage = require(path.join(__dirname, "../packages/storage-file"));
const dashboard = require(path.join(__dirname, "../packages/dashboard"));

describe("integration test - saved tasks to relevant information", () => {
  it("tasks can be grouped by status", async () => {
    const stored = await storage.load(`${__dirname}/status-sample.todo`);
    const groupedTasks = dashboard.groupByStatus(stored.todos);
    expect(groupedTasks["open"].length).toBe(1);
    expect(groupedTasks["done"].length).toBe(1);
    expect(groupedTasks["n/a"].length).toBe(1);
  });
});
