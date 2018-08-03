const repl = require("repl");
const User = require("@todastic/storage-users");

repl.start("> ").context.User = User;
