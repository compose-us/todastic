function socketAuthentication({ User, logger = console }) {
  return (socket, next) => {
    logger.debug("checking websocket authorization");
    const sess = socket.request.session;
    logger.debug(JSON.stringify(sess));
    if (sess && sess.passport && sess.passport.user) {
      User.findById(sess.passport.user, (err, user) => {
        logger.debug(JSON.stringify({ err, user }));
        if (err) {
          logger.debug(err);
          return next(new Error("Database error"));
        } else if (!user) {
          logger.debug("No user found");
          next(new Error("No user found"));
        } else {
          return next();
        }
      });
    } else {
      logger.debug("WS Authentication error");
      next(new Error("Authentication error"));
    }
  };
}

module.exports = socketAuthentication;
