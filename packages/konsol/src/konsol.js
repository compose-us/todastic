const repl = require("repl");
const config = require("@todastic/config");
const { initDatabase } = require("@todastic/server-web/src/server/lib/database-mongo.js");
const { createUserModel } = require("@todastic/storage-users");
const { createEventModel } = require("@todastic/storage-events");

initDatabase({ config, logger: console }).then(db => {
  const myRepl = repl.start("> ");
  const ctx = myRepl.context;
  myRepl.context.User = createUserModel({ mongoose: db.mongoose });
  myRepl.context.Event = createEventModel({ mongoose: db.mongoose });
  myRepl.context.db = db;
});
