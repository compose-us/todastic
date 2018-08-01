const passwordPlugin = require('mongoose-bcrypt');
const mongoose = require("mongoose");
const config = require("@todastic/config");

mongoose.set('debug', true);
let connectionString = "mongodb://"
if(config.get("db.user")) {
  connectionString += `${config.get("db.user")}:${config.get("db.password")}@`;
}
connectionString += `${config.get("db.host")}:${config.get("db.port")}/${config.get("db.database")}`;
console.log(connectionString);
mongoose.connect(connectionString, { useNewUrlParser: true }).catch(err => {
  console.log("Connecting to mongodb failed", err);
});

const userSchema = mongoose.Schema({
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

const User = mongoose.model("User", userSchema);

module.exports = User;
