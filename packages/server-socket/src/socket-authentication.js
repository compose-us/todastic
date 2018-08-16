const User = require("@todastic/storage-users");
const logger = require("@todastic/logging");

function socketAuthentication(socket, next) {
  logger.debug("checking websocket authorization");
  const sess = socket.request.session;
  logger.debug(JSON.stringify(sess));
  if (sess.passport && sess.passport.user) {
    User.findById(sess.passport.user, (err, user) => {
      logger.debug(JSON.stringify({ err, user }));
      if (err) {
        return next(err);
      } else {
        return next();
      }
    });
  } else {
    logger.debug("WS Authentication error");
    next(new Error("Authentication error"));
  }
}

module.exports = socketAuthentication;
