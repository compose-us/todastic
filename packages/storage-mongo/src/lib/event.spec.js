import { createEventModel } from "./event.js";
import { initDatabase } from "../service/database-mongo.js";
import config from "@todastic/config";

describe("Event", () => {
  let Event;
  let mongoose;

  beforeAll(async () => {
    const db = await initDatabase({ config, logger: console });
    mongoose = db.mongoose;
    Event = createEventModel({ mongoose });
  });

  beforeEach(async () => {
    // clear all events
    await Event.remove({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("is invalid without 'eventType'", testWithout("eventType"));

  it("is able to detect bad event type", () => {
    const event = new Event({ eventType: "RAINS_OVER_PASSAU", position: 1 });
    const err = event.validateSync();
    expect(err.errors.eventType).toBeDefined();
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

  it("doesn't return an empty array for labels", async () => {
    // to make sure https://stackoverflow.com/a/20714461/526426 really works
    const event = await Event.create({ eventType: "CHANGED_TODO", data: { todoId: "bla", labels: undefined } });
    expect(event.data.labels).toBeUndefined();
  });

  it("doesn't return an empty array for trackedTimes", async () => {
    // to make sure https://stackoverflow.com/a/20714461/526426 really works
    const event = await Event.create({ eventType: "CHANGED_TODO", data: { todoId: "bla", trackedTimes: undefined } });
    expect(event.data.trackedTimes).toBeUndefined();
  });

  it("can store trackedTimes", async () => {
    const trackedTimes = [
      { trackedTime: "00:10:00", tracker: "Udo", date: "2018-09-15 18:20:15" },
      { trackedTime: "01:00:00", tracker: "Jörn", date: "2018-09-13 17:27:00" }
    ];
    const event = await Event.create({ eventType: "CHANGED_TODO", data: { todoId: "bla", trackedTimes } });
    expect(JSON.stringify(event.data.trackedTimes)).toBe(JSON.stringify(trackedTimes));
  });

  describe("distinguishing users in getEventsByUserId", () => {
    const userId = "5b969b2490d222197f71109e";
    const otherUserId = "5b8ee36b68d1975c7c3d1682";
    beforeEach(async () => {
      await Event.create({ eventType: "ADDED_TODO", userId });
      await Event.create({ eventType: "ADDED_TODO", userId });
      await Event.create({ eventType: "ADDED_TODO", userId: otherUserId });
    });

    it("returns only User1's data", testForUser(userId, 2));
    it("returns only User2's data", testForUser(otherUserId, 1));
    it("returns nothing for an undefined user", testForUser(undefined, 0));
    it("returns nothing for a null user", testForUser(null, 0));
  });

  function testForUser(userId, expectedNumber) {
    return async () => {
      const events = await Event.getEventsByUserId(userId);
      expect(events.length).toBe(expectedNumber);
    };
  }

  function testWithout(field) {
    return () => {
      const hash = { eventType: "ADDED_TODO", position: 1 };
      delete hash[field];
      const event = new Event(hash);
      const err = event.validateSync();
      expect(err.errors[field]).toBeDefined();
    };
  }
});
