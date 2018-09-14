const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const authentication = require("./service/authentication.js");

function startApp({ session, logger, User }) {
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
  app.use(session);

  authentication.register({ app, User, logger });

  app.get("/", (req, res) => {
    res.sendFile(path.normalize(`${__dirname}/../client/index.html`));
  });
  app.get("/home", (req, res) => {
    res.redirect("/");
  });

  app.get("/main.css", (req, res) => {
    res.sendFile(path.normalize(`${__dirname}/../client/main.css`));
  });

  app.use(express.static(path.normalize(`${__dirname}/../../dist/`)));

  return app;
}

module.exports = startApp;
