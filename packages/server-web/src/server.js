const express = require("express");
const app = express();
const server = require("http").Server(app);
const createSocketOnServer = require("@todastic/server-socket");

app.get("/vendor/vue.js", (req, res) => {
  res.sendFile(`${__dirname}/node_modules/vue/dist/vue.js`);
});
app.use(express.static(`${__dirname}/static`));

createSocketOnServer(server);

server.listen(3000, function() {
  console.log("Todastic webserver listening on port 3000, Sire!");
});
