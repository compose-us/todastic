module.exports = { createCommandProcessor };

function createCommandProcessor({ Event, User, logger }) {
  return {
    processCommand: processCommand({ Event, User, logger })
  };
}

function processCommand({ Event, User, logger }) {
  return sendEvent => command => {
    const helpers = { Event, logger, sendEvent, userId: command.userId };
    const labels = setUndefined(command, "labels");
    const trackedTimes = setUndefined(command, "trackedTimes");
    const eventCreateData = { ...helpers, data: { ...command.data, labels, trackedTimes } };
    switch (command.command) {
      case "ADD_TODO":
        return createEvent({ ...eventCreateData, eventType: "ADDED_TODO" });
      case "REMOVE_TODO":
        return createEvent({ ...eventCreateData, eventType: "REMOVED_TODO" });
      case "CHANGE_TODO":
        return createEvent({ ...eventCreateData, eventType: "CHANGED_TODO" });
      case "MOVE_TODO":
        return createEvent({ ...eventCreateData, eventType: "MOVED_TODO" });
      case "CHANGE_PASSWORD":
        return User.findOneAndUpdate({ _id: command.userId }, { password: command.newPassword }).then(res => {
          if (res && res._id == command.userId) {
            return createEvent({ ...helpers, eventType: "CHANGED_PASSWORD", data: {} });
          }
        });
      default:
        logger.error("Unknown command " + command.command);
        return;
    }
  };
}

function setUndefined(command, fieldName) {
  // We have to actively set array valued fields to undefined if they aren't set
  // mongoose otherwise decides, that an empty array is a good idea
  // https://stackoverflow.com/a/20714461/526426
  let field;
  try {
    field = command.data[fieldName];
  } catch (err) {
    // nothing to do here. field simply isn't present.
  }
  return field;
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
