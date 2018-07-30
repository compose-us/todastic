const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('./winston');

function loggedIn(req, res, next) {
    logger.debug("Checking wether user is authenticated");
    logger.debug("req.user:", req.user);
    logger.debug("req.session:", req.session);
    if (req.session) {
        logger.debug("req.session.id:", req.session.id);
    }
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        logger.debug("User not authenticated!");
        res.redirect('/login');
    } else {
        next();
    }
}

function init() {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            return done(null, {
                id: 1
            });
        }
    ));

    passport.serializeUser(function(user, cb) {
        logger.debug("Serializing session user");
        logger.debug(user);
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        logger.debug("Deserializing session user");
        cb(null, {
            id: 1
        });
    });
};

module.exports = {
    init: init,
    p: passport,
    loggedIn: loggedIn
};
