const mongoose = require("mongoose");
const config = require("@todastic/config");
mongoose.connect(
  `mongodb://${config.get("db.user")}:${config.get("db.password")}@${config.get("db.host")}:${config.get(
    "db.port"
  )}/${config.get("db.database")}`
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  active: { type: Boolean, default: true },
  last_updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

// TODO don't store plaintext passwords!
userSchema.methods.validatePassword = function(password) {
  return password == this.password;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
