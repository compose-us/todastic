const express = require("express");
const session = require("express-session");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const authentication = require("./authentication.js");
const logger = require("@todastic/logging");
const morgan = require("morgan");
const config = require("@todastic/config");
const MongoSession = require("connect-mongo")(session);

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
let sessionInitializationHash = {
  secret: config.get("secret"),
  resave: false,
  name: "session",
  saveUninitialized: false
};
if (config.get("sessionStore") === "mongo") {
  try {
    let mongoSession = new MongoSession({ url: config.get("db.connectionString") });
    sessionInitializationHash.store = mongoSession;
  } catch (err) {
    logger.error(err);
  }
}

app.use(session(sessionInitializationHash));

authentication.register({ app });

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/main.css", (req, res) => {
  res.sendFile(`${__dirname}/main.css`);
});

app.use(express.static(`${__dirname}/dist/`));

module.exports = app;
