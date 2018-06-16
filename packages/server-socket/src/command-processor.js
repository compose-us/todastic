let lastEventId = 0;

const processCommand = eventLog => sendEvent => command => {
  if (command.command === "ADD_TODO") {
    const event = { event: "ADDED_TODO", data: { id: ++lastEventId, title: command.data.title } };
    eventLog.push(event);
    sendEvent(event);
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
