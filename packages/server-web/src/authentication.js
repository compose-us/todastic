const Passport = require("passport").Passport;
const LocalStrategy = require("passport-local").Strategy;
const logger = require("@todastic/logging");
const User = require("@todastic/storage-users");

function register({
  app,
  indexRoute = "/",
  loginRoute = "/login",
  logoutRoute = "/logout",
  loginStatusRoute = "/login-status"
}) {
  const passport = new Passport();
  init(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(loginRoute, passport.authenticate("local"), (req, res) => {
    res.redirect(indexRoute);
  });

  app.get(loginStatusRoute, loggedIn, (req, res) => {
    res.send("ok");
  });

  app.post(logoutRoute, (req, res) => {
    req.session.destroy();
    res.redirect(indexRoute);
  });
}

function loggedIn(req, res, next) {
  logger.debug("Checking wether user is authenticated");
  logger.debug("req.user:", req.user);
  logger.debug("req.session:", req.session);
  if (req.session) {
    logger.debug("req.session.id:", req.session.id);
  }
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    logger.debug("User not authenticated!");
    res.sendStatus(401);
  } else {
    next();
  }
}

function init(passport) {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne(
        {
          username: username
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: "Incorrect username."
            });
          }
          if (!user.verifyPasswordSync(password)) {
            return done(null, false, {
              message: "Incorrect password."
            });
          }
          return done(null, user);
        }
      );
    })
  );

  passport.serializeUser(function(user, cb) {
    logger.debug("Serializing session user");
    logger.debug(user);
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    logger.debug("Deserializing session user");
    User.findById(id, (err, user) => {
      console.log({ err, user });
      cb(err, user);
    });
  });
}

module.exports = {
  register
};
