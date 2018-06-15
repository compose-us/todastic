const socketIo = require("socket.io");

function createSocketOnServer(httpServer) {
  const io = socketIo(httpServer);

  io.on("connection", function(socket) {
    console.log("a user connected");
    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
  });
}

module.exports = createSocketOnServer;
