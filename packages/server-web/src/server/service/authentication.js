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

  app.get(
    loginRoute,
    (req, res, next) => {
      if (req.query.username && req.query.password) {
        next();
      } else {
        res.redirect(indexRoute);
      }
    },
    passport.authenticate("local"),
    (req, res) => {
      res.redirect(indexRoute);
    }
  );

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
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      logger.info("User not authenticated!");
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
        logger.debug("Authentication: Found user.");
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Authentication: Incorrect username."
          });
        }
        if (!user.verifyPasswordSync(password)) {
          return done(null, false, {
            message: "Authentication: Incorrect password."
          });
        }
        return done(null, user);
      }
    );
  });

  passport.use(localStrategy);

  passport.serializeUser(function(user, cb) {
    logger.debug("Serializing session user.");
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    logger.debug("Deserializing session user.");
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });
}
