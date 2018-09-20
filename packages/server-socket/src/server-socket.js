const socketIo = require("socket.io");
const { createCommandProcessor } = require("./command-processor.js");
const socketAuthentication = require("./socket-authentication.js");

function createSocketOnServer({ httpServer, session, User, Event, logger }) {
  logger.info("Creating websocket server.");
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

    Event.getEventsByUserId(socket.user._id).then(events => {
      events.forEach(event => {
        socket.emit("event", event);
      });
    });

    socket.on("command", command => {
      logger.debug("command", command);
      // yes, we could add the user id in the frontend.
      // but let's trust the server here.
      command.userId = socket.user._id;
      processCommand(e =>
        connectedSockets.forEach(s => {
          if (s.user._id.toString() == e.userId) {
            s.emit("event", e);
          }
        })
      )(command);
    });

    socket.on("disconnect", function() {
      logger.debug("user disconnected");
      connectedSockets = connectedSockets.filter(s => s !== socket);
    });
  });
}

module.exports = createSocketOnServer;
