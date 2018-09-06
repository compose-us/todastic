module.exports = { createCommandProcessor };

function createCommandProcessor({ Event, logger }) {
  return {
    processCommand: processCommand({ Event, logger })
  };
}

function processCommand({ Event, logger }) {
  return sendEvent => command => {
    const helpers = { Event, logger, sendEvent };
    if (command.command === "ADD_TODO") {
      return createEvent({ ...helpers, eventType: "ADDED_TODO", data: { ...command.data } });
    } else if (command.command === "REMOVE_TODO") {
      return createEvent({ ...helpers, eventType: "REMOVED_TODO", data: { ...command.data } });
    } else if (command.command === "CHANGE_TODO") {
      return createEvent({ ...helpers, eventType: "CHANGED_TODO", data: { ...command.data } });
    }
  };
}

function createEvent({ Event, sendEvent, eventType, data, logger }) {
  return Event.create({
    eventType: eventType,
    data,
    createdAt: Date.now()
  }).then(
    event => {
      logger.debug(event);
      return sendEvent(event);
    },
    err => logger.error(err)
  );
}
