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

  it("is able to detect bad event type", done => {
    const event = new Event({ eventType: "RAINS_OVER_PASSAU", position: 1 });
    event.validate(function(err) {
      expect(err.errors.eventType).toBeDefined();
      done();
    });
  });

  it("automatically increments the position", done => {
    Event.create({ eventType: "ADDED_TODO" }).then(event1 => {
      expect(event1.position).toBeDefined();
      Event.create({ eventType: "ADDED_TODO" }).then(event2 => {
        expect(event2.position).toBeDefined();
        expect(event2.position - event1.position).toEqual(1);
        done();
      });
    });
  });

  it("doesn't overwrite the position", () => {
    Event.create({ eventType: "ADDED_TODO", position: 1234 }).then(event1 => {
      event1.update({ eventType: "CHANGED_TODO" });
      expect(event1.position).toBe(1234);
    });
  });
});

function testWithout(field) {
  return done => {
    const hash = { eventType: "ADDED_TODO", position: 1 };
    delete hash[field];
    const event = new Event(hash);
    event.validate(function(err) {
      expect(err.errors[field]).toBeDefined();
      done();
    });
  };
}
