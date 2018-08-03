const fs = require("fs");
// v1 is timestamp based, so we can still order by ID when it's the same createdAt
// and have some sort of consistent behaviour
// TODO we should require uuid/v1 here, because requiring uuid is deprecated
//      however, i couldn't mock that require because of lacking javascript skills
const uuidv1 = require("uuid/v1");
const { createLogger, replay } = require("@todastic/storage-events");

const processCommand = logger => {
  return sendEvent => command => {
    if (command.command === "ADD_TODO") {
      const event = { event: "ADDED_TODO", data: { ...command.data, id: uuidv1(), createdAt: Date.now() } };
      logger.log(event);
      return sendEvent(event);
    } else if (command.command === "REMOVE_TODO") {
      const event = { event: "REMOVED_TODO", data: { id: command.data.id, createdAt: Date.now() } };
      logger.log(event);
      return sendEvent(event);
    }
  };
};

const createCommandProcessor = filename => {
  const logger = createLogger();

  setupLoggerFileSync(logger, filename);

  return {
    processCommand: processCommand(logger),
    getAllEvents: () => logger.getEvents()
  };
};

module.exports = createCommandProcessor;

function setupLoggerFileSync(logger, filename) {
  if (filename) {
    try {
      const stringifiedEvents = fs.readFileSync(filename);
      if (stringifiedEvents) {
        logger.load(JSON.parse(stringifiedEvents));
      }
    } catch (e) {}

    setInterval(() => {
      const stringifiedEvents = JSON.stringify(logger.getEvents());
      fs.writeFileSync(filename, stringifiedEvents);
    }, 5000);
  }
}
