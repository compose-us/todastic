const repl = require("repl");
const config = require("@todastic/config");
const { createEventModel, initDatabase } = require("@todastic/storage-mongo");
const { createUserModel } = require("@todastic/storage-users");

initDatabase({ config, logger: console }).then(db => {
  const myRepl = repl.start("> ");
  const ctx = myRepl.context;
  myRepl.context.User = createUserModel({ mongoose: db.mongoose });
  myRepl.context.Event = createEventModel({ mongoose: db.mongoose });
  myRepl.context.db = db;
});
