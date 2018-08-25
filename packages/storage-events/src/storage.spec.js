const fs = require("fs");
const storage = require("./storage.js");

describe("storage-events", () => {
  const event1 = { eventType: "ADDED_TODO", eventId: "1", data: { title: "Implement event logging" } };
  const event2 = { eventType: "ADDED_TODO", eventId: "2", data: { title: "Another event added" } };

  it("can save to and load from a file", () => {
    const logger = storage.createLogger();
    const tmpFile = `${__dirname}/__tests__/tmp-file.log`;

    logger.log(event1);
    logger.log(event2);

    fs.writeFileSync(tmpFile, JSON.stringify(logger.getEvents()));
    const contents = fs.readFileSync(tmpFile).toString();
    expect(logger.getEvents()).toEqual(JSON.parse(contents));
  });

  it("replaying from event logger should be the same as a simple list", () => {
    const logger = storage.createLogger();

    logger.log(event1);
    logger.log(event2);

    expect(storage.replay([event1, event2])).toEqual(storage.replay(logger.getEvents()));
  });
});
