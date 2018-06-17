let lastEventId = 0;

const processCommand = eventLog => sendEvent => command => {
  if (command.command === "ADD_TODO") {
    const event = { event: "ADDED_TODO", data: { id: ++lastEventId, title: command.data.title } };
    eventLog.push(event);
    return sendEvent(event);
  } else if (command.command === "REMOVE_TODO") {
    const event = { event: "REMOVED_TODO", data: { id: command.data.id } };
    eventLog.push(event);
    return sendEvent(event);
  }
};

const createCommandProcessor = () => {
  const eventLog = [];
  return {
    processCommand: processCommand(eventLog),
    getAllEvents: () => eventLog
  };
};

module.exports = createCommandProcessor;
