const socketIo = require("socket.io");
const createCommandProcessor = require("./command-processor.js");
const passportSocketIo = require("passport.socketio");
const todasticSession = require("@todastic/server-web/src/session.js");
const logger = require("@todastic/logging");
const socketAuthentication = require("./socket-authentication.js");

const TODASTIC_FILE = `${process.cwd()}/todastic.events`;

function createSocketOnServer(httpServer) {
  const io = socketIo(httpServer);
  io.use((socket, next) => {
    todasticSession(socket.request, {}, next);
  });

  io.use(socketAuthentication);
  const { getAllEvents, processCommand } = createCommandProcessor(TODASTIC_FILE);
  let connectedSockets = [];

  io.on("connection", function(socket) {
    logger.debug("a user connected");
    connectedSockets.push(socket);

    getAllEvents().forEach(event => socket.emit("event", event));

    socket.on("command", command => {
      logger.debug("command", command);
      processCommand(e => connectedSockets.forEach(s => s.emit("event", e)))(command);
    });

    socket.on("disconnect", function() {
      logger.debug("user disconnected");
      connectedSockets = connectedSockets.filter(s => s !== socket);
    });
  });
}

module.exports = createSocketOnServer;
