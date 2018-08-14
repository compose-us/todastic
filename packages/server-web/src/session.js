const session = require("express-session");
const MongoSession = require("connect-mongo")(session);
const config = require("@todastic/config");
const logger = require("@todastic/logging");

const sessionInitializationHash = {
  secret: config.get("secret"),
  resave: false,
  name: "session",
  saveUninitialized: false
};

if (config.get("sessionStore") === "mongo") {
  try {
    const mongoSession = new MongoSession({ url: config.get("db.connectionString") });
    sessionInitializationHash.store = mongoSession;
  } catch (err) {
    logger.error(err);
  }
}
const todasticSession = session(sessionInitializationHash);
module.exports = todasticSession;
