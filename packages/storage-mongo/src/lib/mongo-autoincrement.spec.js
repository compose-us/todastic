import { createSequenceSchema, getNextSequenceValue } from "./mongo-autoincrement.js";
import { initDatabase } from "../service/database-mongo.js";
import config from "@todastic/config";

describe("Autoincrement of a sequence", () => {
  let Sequence;
  let mongoose;
  beforeAll(async () => {
    let { mongoose } = await initDatabase({ config, logger: console });
    console.log("Information from beforeAll: got mongoose");
    Sequence = await createSequenceSchema({ mongoose });
    console.log("Information from beforeAll: got Sequence");
  });

  afterAll(async () => {
    console.log("Information from afterAll: about to disconnect from mongo");
    await mongoose.disconnect();
    console.log("Information from afterAll: disconnected");
  });

  xit("returns a sequence number", async () => {
    const x = await getNextSequenceValue({ model: Sequence, sequenceName: "testSequence" });
    expect(Number.isInteger(x)).toBeTruthy();
  });

  xit("increments the new sequence number by 1", async () => {
    const x1 = await getNextSequenceValue({ model: Sequence, sequenceName: "testSequence" });
    const x2 = await getNextSequenceValue({ model: Sequence, sequenceName: "testSequence" });
    expect(x2 - x1).toBe(1);
  });
});
