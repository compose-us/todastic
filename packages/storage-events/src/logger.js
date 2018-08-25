function createLogger() {
  let eventLog = [];

  return {
    load(log) {
      eventLog = log;
    },
    log(event) {
      if (!event.eventType) {
        throw new Error(`Unknown event: ${event.eventType}`);
      }
      eventLog.push(event);
    },
    getEvents() {
      return Object.assign([], eventLog);
    }
  };
}

module.exports = createLogger;
