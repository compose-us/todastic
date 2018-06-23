function createLogger() {
  let eventLog = [];

  return {
    load(log) {
      eventLog = log;
    },
    log(event) {
      if (!event.event) {
        throw new Error(`Unknown event: ${event.event}`);
      }
      eventLog.push(event);
    },
    getEvents() {
      return Object.assign([], eventLog);
    }
  };
}

module.exports = createLogger;
