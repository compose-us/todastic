const timestamps = require("mongoose-timestamp");
const { createSequenceSchema, getNextSequenceValue } = require("@todastic/server-web/src/mongo-autoincrement.js");

module.exports = { createEventModel };

function createEventModel({ mongoose }) {
  const sequenceModel = createSequenceSchema({ mongoose });

  const eventSchema = new mongoose.Schema({
    eventType: { type: String, required: true, enum: ["ADDED_TODO", "REMOVED_TODO", "CHANGED_TODO"] },
    schemaVersion: { type: Number, required: true, default: currentSchemaVersion },
    position: { type: Number },
    data: {
      parentId: { type: String },
      title: { type: String }
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

  eventSchema.statics.getEvents = () => {
    return this.find({}).sort("position");
  };

  return mongoose.model("Event", eventSchema);
}

function currentSchemaVersion() {
  return 1;
}
