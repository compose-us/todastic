const app = require("./app.js");
const logger = require("@todastic/logging");
const config = require("@todastic/config");
const createSocketOnServer = require("@todastic/server-socket");

const server = require("http").Server(app);
createSocketOnServer(server);

server.listen(config.get("port"), function() {
  logger.info(`Todastic webserver listening on port ${config.get("port")}, Sire!`);
});
