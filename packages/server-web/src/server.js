const express = require("express");
const app = express();
const server = require("http").Server(app);
const createSocketOnServer = require("@todastic/server-socket");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

createSocketOnServer(server);

server.listen(3000, function() {
  console.log("Todastic webserver listening on port 3000, Sire!");
});
