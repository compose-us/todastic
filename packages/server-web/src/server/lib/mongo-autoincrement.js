/*
Auto-incrementing works with the collection "sequences" that keeps track of the current last set index.
findOneAndUpdate issues a mongodb findAndModify update command.
findAndModify is an atomic operation - with this we ensure to always return a unique value.
see https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
see https://docs.mongodb.com/manual/reference/command/findAndModify/
*/

module.exports = { createSequenceSchema, getNextSequenceValue };

function createSequenceSchema({ mongoose }) {
  const sequenceSchema = new mongoose.Schema({
    sequenceId: { type: String, required: true, unique: true }, // TODO downcase, database safe value
    sequenceValue: { type: Number, required: true, default: 0 }
  });

  return mongoose.model("Sequence", sequenceSchema);
}

async function getNextSequenceValue({ model, sequenceName }) {
  const sequenceDocument = await new Promise((resolve, reject) => {
    model.findOneAndUpdate(
      { sequenceId: sequenceName },
      { $inc: { sequenceValue: 1 } },
      {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true // if true, return the modified document
      },
      (err, doc) => {
        if (err) {
          return reject(err);
        }
        return resolve(doc);
      }
    );
  });
  return sequenceDocument.sequenceValue;
}
