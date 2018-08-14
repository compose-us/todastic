const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("@todastic/config");
const logger = require("@todastic/logging");
const authentication = require("./authentication.js");
const todasticSession = require("./session.js");

const app = express();

app.use(
  morgan("combined", {
    stream: logger.stream
  })
);
app.use(helmet());
app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// TODO app.set('trust proxy', 1);
app.use(todasticSession);

authentication.register({ app });

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/main.css", (req, res) => {
  res.sendFile(`${__dirname}/main.css`);
});

app.use(express.static(`${__dirname}/dist/`));

module.exports = app;
