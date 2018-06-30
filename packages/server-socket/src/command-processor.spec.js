const createCommandProcessor = require("./command-processor.js");
let uuidv1 = require("uuid/v1");

let dateNowSpy;
let mockClock = new Date("2018-06-30T16:54:59.218Z");
beforeAll(() => {
    // Lock Time
    dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => new Date(++mockClock));
});

afterAll(() => {
    // Unlock Time
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
    // Unmock uuid
    // The mock comes from __mock__/uuid.js and is loaded automatically
    jest.unmock("uuid");
});

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

    it("sends a REMOVED_TODO event when a correct REMOVE_TODO command was received", async () => {
      const { processCommand } = createCommandProcessor();
      const addedItemId = await new Promise(resolve => {
        const sendEvent = jest.fn(event => {
          resolve(event.data.id);
        });
        const command = { command: "ADD_TODO", data: { title: "Create a test todo" } };
        processCommand(sendEvent)(command);
      });
      const removeCommand = { command: "REMOVE_TODO", data: { id: addedItemId } };
      const sendEvent = jest.fn();
      processCommand(sendEvent)(removeCommand);
      expect(sendEvent).toHaveBeenCalledTimes(1);
      expect(sendEvent).toMatchSnapshot();
    });
  });
});
