const createCommandProcessor = require("./command-processor.js");

describe("command-processor", () => {
  describe("getAllEvents", () => {
    it("returns an empty list initially", () => {
      const { getAllEvents } = createCommandProcessor();
      expect(getAllEvents()).toEqual([]);
    });
  });

  describe("processCommand", () => {
    it("unknown command results in no sent events", () => {
      const command = { command: "UNKNOWN_COMMAND" };
      const sendEvent = jest.fn();
      const { processCommand } = createCommandProcessor();
      processCommand(sendEvent)(command);
      expect(sendEvent).not.toBeCalled();
    });

    it("sends an ADDED_TODO event when a correct ADD_TODO command was received", () => {
      const command = { command: "ADD_TODO", data: { title: "Create a test todo" } };
      const sendEvent = jest.fn();
      const { processCommand } = createCommandProcessor();
      processCommand(sendEvent)(command);
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(sendEvent).toMatchSnapshot();
    });
  });
});
