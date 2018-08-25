const { createEventModel } = require("./event.js");
const mongoose = require("mongoose");

const Event = createEventModel({ mongoose });

describe("Event", () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  it("is invalid without 'issuer'", testWithout("issuer"));
  it("is invalid without 'eventType'", testWithout("eventType"));
  it("is invalid without 'position'", testWithout("position"));

  it("is able to detect bad event type", done => {
    let event = new Event({ eventType: "LET_IT_RAIN_OVER_PASSAU", position: 1, issuer: "berti", eventId: "324bbb" });
    event.validate(function(err) {
      expect(err.errors.eventType).toBeDefined();
      done();
    });
  });
});

function testWithout(field) {
  return done => {
    let hash = { eventType: "ADDED_TODO", position: 1, issuer: "berti", eventId: "324bbb" };
    delete hash[field];
    let event = new Event(hash);
    event.validate(function(err) {
      expect(err.errors[field]).toBeDefined();
      done();
    });
  };
}
