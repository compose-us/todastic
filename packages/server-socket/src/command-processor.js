const fs = require("fs");
const { createLogger, replay } = require("@todastic/storage-events");

const processCommand = (logger, maxTodoId) => {
  let lastTodoId = maxTodoId;
  return sendEvent => command => {
    if (command.command === "ADD_TODO") {
      const event = { event: "ADDED_TODO", data: { ...command.data, id: ++lastTodoId } };
      logger.log(event);
      return sendEvent(event);
    } else if (command.command === "REMOVE_TODO") {
      const event = { event: "REMOVED_TODO", data: { id: command.data.id } };
      logger.log(event);
      return sendEvent(event);
    }
  };
};

const createCommandProcessor = filename => {
  const logger = createLogger();

  const maxTodoId = replay(logger.getEvents())
    .todos.map(t => t.id)
    .reduce((max, id) => (id > max ? id : max), 0);

  setupLoggerFileSync(logger, filename);

  return {
    processCommand: processCommand(logger, maxTodoId),
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
