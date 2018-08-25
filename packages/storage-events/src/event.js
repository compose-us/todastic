// v1 is timestamp based, so we can still order by ID when it's the same createdAt
// and have some sort of consistent behaviour
const uuidv1 = require("uuid/v1");

module.exports = { createEventModel };

function createEventModel({ mongoose }) {
  const eventSchema = new mongoose.Schema({
    eventType: { type: String, required: true, enum: ["ADDED_TODO", "REMOVED_TODO", "CHANGED_TODO"] },
    schemaVersion: { type: Number, required: true, default: currentSchemaVersion },
    position: { type: Number, required: true },
    issuer: { type: String, required: true },
    parentId: { type: String },
    data: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    eventId: { type: String, required: true, unique: true, default: uuidv1() } // maybe we only need the mongo object id
  });

  return mongoose.model("Event", eventSchema);
}

function currentSchemaVersion() {
  return 1;
}
