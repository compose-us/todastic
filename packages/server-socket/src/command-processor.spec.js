const { createCommandProcessor } = require("./command-processor.js");

describe("command-processor", () => {
  let Event;
  let sendEvent;
  beforeEach(() => {
    createMock = jest.fn();
    sendEvent = jest.fn();
    Event = {
      create: createMock.mockReturnValue(
        new Promise((resolve, reject) => {
          resolve({ iam: "mock" });
        })
      )
    };
  });

  describe("processCommand", () => {
    it("unknown command results in no sent events", () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const command = { command: "UNKNOWN_COMMAND" };
      processCommand(sendEvent)(command);
      expect(sendEvent).not.toBeCalled();
    });

    it("sends an ADDED_TODO event when a correct ADD_TODO command was received", () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const command = { command: "ADD_TODO", data: { title: "Create a test todo" } };
      processCommand(sendEvent)(command).then(x => {
        expect(createMock).toHaveBeenCalled();
        expect(sendEvent).toHaveBeenCalledTimes(1);
        expect(createMock.mock.calls[0][0]).toMatchSnapshot({
          createdAt: expect.any(Number)
        });
        expect(createMock.mock.calls[0][0]["eventType"]).toEqual("ADDED_TODO");
      });
    });

    it("sends a REMOVED_TODO event when a correct REMOVE_TODO command was received", async () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const addedItemId = await new Promise(resolve => {
        const sendEvent = jest.fn(event => {
          resolve(event.id);
        });
        const command = { command: "ADD_TODO", data: { title: "Create a test todo" } };
        processCommand(sendEvent)(command);
      });
      const removeCommand = { command: "REMOVE_TODO", data: { eventId: addedItemId } };
      const sendEvent = jest.fn();
      processCommand(sendEvent)(removeCommand).then(x => {
        expect(sendEvent).toHaveBeenCalledTimes(1);
        expect(sendEvent.mock.calls[0][0]["data"]).toEqual({
          id: expect.any(String)
        });
        expect(sendEvent.mock.calls[0][0]["eventType"]).toEqual("REMOVED_TODO");
      });
    });
  });
});
