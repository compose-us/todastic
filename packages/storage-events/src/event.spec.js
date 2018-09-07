const { createEventModel } = require("./event.js");
const { initDatabase } = require("@todastic/server-web/src/database-mongo.js");
const config = require("@todastic/config");

let Event;
let mongoose;
describe("Event", () => {
  beforeAll(async () => {
    let { mongoose } = await initDatabase({ config, logger: console });
    Event = createEventModel({ mongoose });
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it("is invalid without 'eventType'", testWithout("eventType"));

  it("is able to detect bad event type", async () => {
    const event = new Event({ eventType: "RAINS_OVER_PASSAU", position: 1 });
    event.validate(function(err) {
      expect(err.errors.eventType).toBeDefined();
    });
  });

  it("automatically increments the position", async () => {
    const event1 = await Event.create({ eventType: "ADDED_TODO" });
    expect(event1.position).toBeDefined();
    const event2 = await Event.create({ eventType: "ADDED_TODO" });
    expect(event2.position).toBeDefined();
    expect(event2.position - event1.position).toEqual(1);
  });

  it("creates a todoId", async () => {
    const event = await Event.create({ eventType: "ADDED_TODO" });
    expect(event.data.todoId).toBeDefined();
  });

  it("can set a status without crashing", async () => {
    const event = await Event.create({ eventType: "ADDED_TODO", data: { status: "done" } });
    expect(event.data.status).toBe("done");
  });

  it("doesn't overwrite the position", async () => {
    const event1 = await Event.create({ eventType: "ADDED_TODO" });
    const position = event1.position;
    expect(position).toBeDefined();
    await event1.update({ eventType: "CHANGED_TODO" });
    expect(event1.position).toBe(position);
  });
});

function testWithout(field) {
  return async () => {
    const hash = { eventType: "ADDED_TODO", position: 1 };
    delete hash[field];
    const event = new Event(hash);
    await event.validate(function(err) {
      expect(err.errors[field]).toBeDefined();
    });
  };
}
