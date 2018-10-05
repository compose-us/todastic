import { createSequenceSchema, getNextSequenceValue } from "./mongo-autoincrement.js";
import { initDatabase } from "../service/database-mongo.js";
import config from "@todastic/config";

describe("Autoincrement of a sequence", () => {
  let Sequence;
  let mongoose;
  beforeAll(async () => {
    let { mongoose } = await initDatabase({ config, logger: console });
    Sequence = createSequenceSchema({ mongoose });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("returns a sequence number", () => {
    return getNextSequenceValue({ model: Sequence, sequenceName: "testSequence" }).then(x => {
      expect(Number.isInteger(x)).toBeTruthy();
    });
  });

  it("increments the new sequence number by 1", () => {
    return getNextSequenceValue({ model: Sequence, sequenceName: "testSequence" }).then(x1 => {
      getNextSequenceValue({ model: Sequence, sequenceName: "testSequence" }).then(x2 => {
        expect(x2 - x1).toBe(1);
      });
    });
  });
});
