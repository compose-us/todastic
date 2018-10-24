import timestamps from "mongoose-timestamp";
import { createSequenceSchema, getNextSequenceValue } from "../service/mongo-autoincrement";

export { createEventModel };

function createEventModel({ mongoose }) {
  const sequenceModel = createSequenceSchema({ mongoose });

  const eventSchema = new mongoose.Schema({
    eventType: { type: String, required: true, enum: ["ADDED_TODO", "REMOVED_TODO", "CHANGED_TODO", "MOVED_TODO"] },
    schemaVersion: { type: Number, required: true, default: currentSchemaVersion },
    position: { type: Number }, // position in event stream
    userId: { type: mongoose.Schema.Types.ObjectId },
    data: {
      todoId: { type: String, required: true, default: uuidv4 },
      parentId: { type: String, default: null },
      title: { type: String },
      status: { type: String, enum: ["open", "done"], default: "open" },
      // DO NOT CHANGE THE labels DEFAULT VALUE UNLESS YOU KNOW WHAT YOU'RE DOING
      // https://stackoverflow.com/a/20714461/526426
      labels: { type: Array, default: undefined },
      position: { type: Number }, // position of ToDo
      // DO NOT CHANGE THE trackedTimes DEFAULT VALUE UNLESS YOU KNOW WHAT YOU'RE DOING
      // https://stackoverflow.com/a/20714461/526426
      trackedTimes: { type: Array, default: undefined }
    }
  });

  eventSchema.plugin(timestamps);

  eventSchema.pre("save", function(next) {
    if (this.position === undefined) {
      getNextSequenceValue({ model: sequenceModel, sequenceName: "eventPosition" })
        .then(x => {
          this.position = x;
          next();
        })
        .catch(err => {
          next(err);
        });
    }
  });

  // NOTE
  // Do not declare statics using ES6 arrow functions (=>).
  // Arrow functions explicitly prevent binding this correctly.
  eventSchema.statics.getEventsByUserId = function(userId) {
    return this.find({ userId }).sort("position");
  };

  return mongoose.model("Event", eventSchema);
}

function currentSchemaVersion() {
  return 1;
}
// see https://stackoverflow.com/a/2117523/526426
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
