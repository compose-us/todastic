const socketIo = require("socket.io");
const createCommandProcessor = require("./command-processor.js");

const TODASTIC_FILE = `${process.cwd()}/todastic.events`;

function createSocketOnServer(httpServer) {
  const io = socketIo(httpServer);
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
