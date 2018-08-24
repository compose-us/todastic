const passwordPlugin = require("mongoose-bcrypt");

module.exports = { createUserModel };

function createUserModel({ mongoose }) {
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, bcrypt: true },
    email: {
      type: String,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    active: { type: Boolean, default: true },
    last_updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
  });

  userSchema.plugin(passwordPlugin);

  return mongoose.model("User", userSchema);
}
