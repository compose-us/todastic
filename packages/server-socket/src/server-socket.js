const socketIo = require("socket.io");
const createCommandProcessor = require("./command-processor.js");
const passportSocketIo = require("passport.socketio");
const todasticSession = require("@todastic/server-web/src/session.js");
const User = require("@todastic/storage-users");
const logger = require("@todastic/logging");

const TODASTIC_FILE = `${process.cwd()}/todastic.events`;

function createSocketOnServer(httpServer) {
  const io = socketIo(httpServer);
  io.use((socket, next) => {
    todasticSession(socket.request, {}, next);
  });

  io.use((socket, next) => {
    logger.debug("checking websocket authorization");
    const sess = socket.request.session;
    logger.debug(sess);
    if (sess.passport && sess.passport.user) {
      User.findById(sess.passport.user, (err, user) => {
        logger.debug({ err, user });
        if (err) {
          return next(err);
        } else {
          return next();
        }
      });
    } else {
      logger.debug("WS Authentication error");
      next(new Error("Authentication error"));
    }
  });
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
