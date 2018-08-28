const socketIo = require("socket.io");
const { createCommandProcessor } = require("./command-processor.js");
const socketAuthentication = require("./socket-authentication.js");

function createSocketOnServer({ httpServer, session, User, Event, logger }) {
  const io = socketIo(httpServer);
  io.use((socket, next) => {
    session(socket.request, {}, next);
  });

  io.use(socketAuthentication({ User, logger }));
  const { processCommand } = createCommandProcessor({ Event, logger });
  let connectedSockets = [];

  io.on("connection", function(socket) {
    logger.debug("a user connected");
    connectedSockets.push(socket);

    Event.getEvents().forEach(event => socket.emit("event", event));

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
