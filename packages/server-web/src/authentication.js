const Passport = require("passport").Passport;
const LocalStrategy = require("passport-local").Strategy;

module.exports = { register };

function register({
  app,
  indexRoute = "/",
  loginRoute = "/login",
  logoutRoute = "/logout",
  loginStatusRoute = "/login-status",
  User,
  logger
}) {
  const passport = new Passport();
  init({ passport, User, logger });
  const loggedInMiddleware = loggedIn(logger);

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(loginRoute, passport.authenticate("local"), (req, res) => {
    res.redirect(indexRoute);
  });

  app.get(loginStatusRoute, loggedInMiddleware, (req, res) => {
    res.send("ok");
  });

  app.post(logoutRoute, (req, res) => {
    req.session.destroy();
    res.redirect(indexRoute);
  });
}

function loggedIn(logger) {
  return (req, res, next) => {
    logger.debug("Checking whether user is authenticated");
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
  };
}

function init({ passport, User, logger }) {
  const localStrategy = new LocalStrategy(function(username, password, done) {
    User.findOne(
      {
        username: username
      },
      function(err, user) {
        logger.debug("Found user: %v", user);
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
  });

  passport.use(localStrategy);

  passport.serializeUser(function(user, cb) {
    logger.debug("Serializing session user", user);
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    logger.debug("Deserializing session user");
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });
}
