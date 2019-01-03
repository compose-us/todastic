const { createCommandProcessor } = require("./command-processor.js");

describe("command-processor", () => {
  let Event;
  let sendEvent;
  let createMock;
  beforeEach(() => {
    createMock = jest.fn();
    sendEvent = jest.fn();
    Event = {
      create: createMock.mockReturnValue(
        new Promise((resolve, _reject) => {
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

    it("sends an ADDED_TODO event when a correct ADD_TODO command was received", async () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const command = { command: "ADD_TODO", data: { title: "Create a test todo" }, userId: "uu" };
      await processCommand(sendEvent)(command);
      expect(createMock).toHaveBeenCalled();
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(createMock.mock.calls[0][0]).toMatchSnapshot({
        createdAt: expect.any(Number)
      });
      expect(createMock.mock.calls[0][0]["eventType"]).toEqual("ADDED_TODO");
    });

    it("sends a CHANGED_TODO event when a correct CHANGE_TODO command was received", async () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const command = { command: "CHANGE_TODO", data: { title: "Change a title", todoId: "id-1" }, userId: "uu" };
      await processCommand(sendEvent)(command);
      expect(createMock).toHaveBeenCalled();
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(createMock.mock.calls[0][0]).toMatchSnapshot({
        createdAt: expect.any(Number)
      });
    });

    it("sends a CHANGED_PASSWORD event when a correct CHANGE_PASSWORD command was received", async () => {
      const User = {
        findOneAndUpdate: () =>
          new Promise((resolve, _reject) => {
            resolve({ _id: "uu" });
          })
      };
      const { processCommand } = createCommandProcessor({ Event, User, logger: console });
      const command = { command: "CHANGE_PASSWORD", data: { newPassword: "verySecret" }, userId: "uu" };
      await processCommand(sendEvent)(command);
      expect(createMock).toHaveBeenCalled();
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(createMock.mock.calls[0][0]).toMatchSnapshot({
        createdAt: expect.any(Number)
      });
    });

    it("doesn't create an empty label array for a CHANGED_TODO event out of the blue", async () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const command = { command: "CHANGE_TODO", data: { status: "done", todoId: "id-1" }, userId: "uu" };
      await processCommand(sendEvent)(command);
      expect(createMock.mock.calls[0][0].data.labels).toBe(undefined);
    });

    it("doesn't create an empty trackedTimes array for a CHANGED_TODO event out of the blue", async () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const command = { command: "CHANGE_TODO", data: { status: "done", todoId: "id-1" }, userId: "uu" };
      await processCommand(sendEvent)(command);
      expect(createMock.mock.calls[0][0].data.trackedTimes).toBe(undefined);
    });

    it("sends a REMOVED_TODO event when a correct REMOVE_TODO command was received", async () => {
      const { processCommand } = createCommandProcessor({ Event, logger: console });
      const addedItemId = await new Promise(resolve => {
        const sendEvent = jest.fn(event => {
          resolve(event.id);
        });
        const command = { command: "ADD_TODO", data: { title: "Create a test todo" }, userId: "uu" };
        processCommand(sendEvent)(command);
      });
      const removeCommand = { command: "REMOVE_TODO", data: { todoId: addedItemId }, userId: "uu" };
      const sendEvent = jest.fn();
      processCommand(sendEvent)(removeCommand).then(_x => {
        expect(sendEvent).toHaveBeenCalledTimes(1);
        expect(sendEvent.mock.calls[0][0]["data"]).toEqual({
          todoId: expect.any(String)
        });
        expect(sendEvent.mock.calls[0][0]["eventType"]).toEqual("REMOVED_TODO");
      });
    });
  });
});
