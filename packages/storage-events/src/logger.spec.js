const createLogger = require("./logger.js");

describe("log", () => {
  it("can create a logger", () => {
    expect(() => createLogger()).not.toThrow();
  });

  it("will throw if event is not in a correct schema", () => {
    const logger = createLogger();
    const event = {};
    expect(() => logger.log(event)).toThrowErrorMatchingSnapshot();
  });

  it("can log regular events", () => {
    const logger = createLogger();
    const event = { eventType: "ADDED_TODO", eventId: "1", data: { title: "Implement event logging" } };
    expect(() => logger.log(event)).not.toThrow();
  });

  it("can save a single event", async () => {
    const logger = createLogger();
    const event = { eventType: "ADDED_TODO", eventId: "1", data: { title: "Implement event logging" } };
    expect(() => logger.log(event)).not.toThrow();
    expect(logger.getEvents()).toBeDefined();
  });

  it("can load an event log", async () => {
    const logger = createLogger();
    const eventLog = [{ eventType: "ADDED_TODO", eventId: "1", data: { title: "Implement event logging" } }];
    logger.load(eventLog);
    expect(logger.getEvents()).toEqual(eventLog);
  });

  it("mutates the log whenever a new event is logged", async () => {
    const logger = createLogger();
    const event1 = { eventType: "ADDED_TODO", id: "1", data: { title: "Implement event logging" } };
    const event2 = { eventType: "ADDED_TODO", id: "2", data: { title: "Another event added" } };
    logger.log(event1);
    const first = logger.getEvents();
    logger.log(event2);
    const second = logger.getEvents();
    expect(first).not.toEqual(second);
  });
});
