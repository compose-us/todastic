const repl = require("repl");
const config = require("@todastic/config");
const { initDatabase } = require("@todastic/server-web/src/database-mongo.js");
const { createUserModel } = require("@todastic/storage-users");

initDatabase({ config }).then(db => {
  const myRepl = repl.start("> ");
  const ctx = myRepl.context;
  myRepl.context.User = createUserModel({ mongoose: db.mongoose });
  myRepl.context.db = db;
});
