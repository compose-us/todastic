const express = require("express");
const app = express();
const server = require("http").Server(app);
const createSocketOnServer = require("@todastic/server-socket");
const logger = require('../config/winston');
const morgan = require('morgan');

app.use(morgan('combined', {
    stream: logger.stream
}));
app.get("/login", (req, res) => {
    res.sendFile(`${__dirname}/login.html`);
});

app.get("/",
    (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
    }
);

app.get("/main.css",
    (req, res) => {
        res.sendFile(`${__dirname}/main.css`);
    }
);
app.use(
    express.static(`${__dirname}/dist/`)
);

createSocketOnServer(server);

server.listen(3000, function() {
    logger.info("Todastic webserver listening on port 3000, Sire!");
});
