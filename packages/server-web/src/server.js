const express = require("express");
const session = require('express-session');
const app = express();
const server = require("http").Server(app);
const bodyParser = require('body-parser');
const passport = require('../config/passport');
const createSocketOnServer = require("@todastic/server-socket");
const logger = require('@todastic/logging');
const morgan = require('morgan');
const config = require("@todastic/config");
const MongoSession = require("connect-mongo")(session);

app.use(morgan('combined', {
    stream: logger.stream
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// TODO https://www.npmjs.com/package/express-session#cookiesecure
// TODO http://expressjs.com/de/advanced/best-practice-security.html
//app.set('trust proxy', 1);
app.use(session({
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: false,
    store: new MongoSession({ url: config.get('db.connectionString') })
}));

passport.init();
app.use(passport.p.initialize());
app.use(passport.p.session());

app.get("/login", (req, res) => {
    res.sendFile(`${__dirname}/login.html`);
});

app.post("/login",
    function(re, r, next) {
      next();
    },
    passport.p.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }), (req, res) => {
      res.redirect("/");
    }
);

app.get("/",
    passport.loggedIn,
    (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
    }
);

app.get("/main.css",
    (req, res) => {
        res.sendFile(`${__dirname}/main.css`);
    }
);

// TODO this should be secured by loggedIn check as well
// somehow my chrome doesn't send the session cookie
// for this request... no idea, why
app.use(
    express.static(`${__dirname}/dist/`)
);

createSocketOnServer(server);

server.listen(3000, function() {
    logger.info("Todastic webserver listening on port 3000, Sire!");
});
