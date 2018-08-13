const Passport = require("passport").Passport;
const LocalStrategy = require("passport-local").Strategy;
const logger = require("@todastic/logging");
const User = require("@todastic/storage-users");

function register({ app, indexRoute = "/", loginRoute = "/login", logoutRoute = "/logout" }) {
  const passport = new Passport();
  init(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(loginRoute, passport.authenticate("local"), (req, res) => {
    res.redirect(indexRoute);
  });

  app.post(logoutRoute, (req, res) => {
    req.session.destroy();
    res.redirect(indexRoute);
  });
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
    let user = User.findById(id);
    cb(null, user);
  });
}

module.exports = {
  register
};
