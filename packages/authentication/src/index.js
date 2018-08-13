const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("@todastic/logging");
const User = require("@todastic/storage-users");

function loggedIn(req, res, next) {
  logger.debug("Checking wether user is authenticated");
  logger.debug("req.user:", req.user);
  logger.debug("req.session:", req.session);
  if (req.session) {
    logger.debug("req.session.id:", req.session.id);
  }
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    logger.debug("User not authenticated!");
    //res.redirect("/login");
  } else {
    next();
  }
}
function init() {
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
    let user = User.findById(id);
    cb(null, user);
  });
}

module.exports = {
  init: init,
  p: passport,
  loggedIn: loggedIn
};
