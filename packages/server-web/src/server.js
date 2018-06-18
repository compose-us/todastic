const express = require("express");
const app = express();
const server = require("http").Server(app);
const createSocketOnServer = require("@todastic/server-socket");

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.get("/main.css", (req, res) => {
  res.sendFile(`${__dirname}/main.css`);
});
app.use(express.static(`${__dirname}/dist/`));

createSocketOnServer(server);

server.listen(3000, function() {
  console.log("Todastic webserver listening on port 3000, Sire!");
});
