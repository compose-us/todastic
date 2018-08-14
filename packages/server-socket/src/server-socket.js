const socketIo = require("socket.io");
const createCommandProcessor = require("./command-processor.js");
const passportSocketIo = require("passport.socketio");
const todasticSession = require("@todastic/server-web/src/session.js");
const User = require("@todastic/storage-users");

const TODASTIC_FILE = `${process.cwd()}/todastic.events`;

function createSocketOnServer(httpServer) {
  const io = socketIo(httpServer);
  io.use((socket, next) => {
    todasticSession(socket.request, {}, next);
  });

  io.use((socket, next) => {
    console.log("let's check");
    const sess = socket.request.session;
    console.log(sess);
    if (sess.passport && sess.passport.user) {
      User.findById(sess.passport.user, (err, user) => {
        console.log({ err, user });
        if (err) {
          return next(err);
        } else {
          return next();
        }
      });
    } else {
      next(new Error("Authentication error"));
    }
  });
  const { getAllEvents, processCommand } = createCommandProcessor(TODASTIC_FILE);
  let connectedSockets = [];

  io.on("connection", function(socket) {
    console.log("a user connected");
    connectedSockets.push(socket);

    getAllEvents().forEach(event => socket.emit("event", event));

    socket.on("command", command => {
      console.log("command", command);
      processCommand(e => connectedSockets.forEach(s => s.emit("event", e)))(command);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected");
      connectedSockets = connectedSockets.filter(s => s !== socket);
    });
  });
}

module.exports = createSocketOnServer;
