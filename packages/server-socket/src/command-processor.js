module.exports = { createCommandProcessor };

function createCommandProcessor({ Event, User, logger }) {
  return {
    processCommand: processCommand({ Event, User, logger })
  };
}

function processCommand({ Event, User, logger }) {
  return sendEvent => command => {
    const helpers = { Event, logger, sendEvent, userId: command.userId };
    const labels = setLabels(command);
    if (command.command === "ADD_TODO") {
      return createEvent({ ...helpers, eventType: "ADDED_TODO", data: { ...command.data, labels } });
    } else if (command.command === "REMOVE_TODO") {
      return createEvent({ ...helpers, eventType: "REMOVED_TODO", data: { ...command.data, labels } });
    } else if (command.command === "CHANGE_TODO") {
      return createEvent({ ...helpers, eventType: "CHANGED_TODO", data: { ...command.data, labels } });
    } else if (command.command === "MOVE_TODO") {
      return createEvent({ ...helpers, eventType: "MOVED_TODO", data: { ...command.data, labels } });
    } else if (command.command === "CHANGE_PASSWORD") {
      return User.findOneAndUpdate({ _id: command.userId }, { password: command.newPassword }).then(res => {
        if (res && res._id == command.userId) {
          return createEvent({ ...helpers, eventType: "CHANGED_PASSWORD", data: {} });
        }
      });
    }
  };
}

function setLabels(command) {
  // We have to actively set labels to undefined if it isn't set due to
  // https://stackoverflow.com/a/20714461/526426
  let labels;
  try {
    labels = command.data.labels;
  } catch (err) {}
  return labels;
}

function createEvent({ Event, sendEvent, userId, eventType, data, logger }) {
  return Event.create({
    eventType: eventType,
    data,
    userId,
    createdAt: Date.now()
  }).then(
    event => {
      logger.debug(event);
      return sendEvent(event);
    },
    err => logger.error(err)
  );
}
