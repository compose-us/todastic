module.exports = { createCommandProcessor };

function createCommandProcessor({ Event, logger }) {
  return {
    processCommand: processCommand({ Event, logger })
  };
}

function processCommand({ Event, logger }) {
  return sendEvent => command => {
    if (command.command === "ADD_TODO") {
      return Event.create({
        eventType: "ADDED_TODO",
        data: { ...command.data },
        createdAt: Date.now()
      }).then(
        event => {
          logger.debug(event);
          return sendEvent(event);
        },
        err => logger.error(err)
      );
    } else if (command.command === "REMOVE_TODO") {
      return Event.create({
        eventType: "REMOVED_TODO",
        data: { id: command.data.id },
        createdAt: Date.now()
      }).then(
        event => {
          logger.debug(event);
          return sendEvent(event);
        },
        err => logger.error(err)
      );
    }
  };
}
