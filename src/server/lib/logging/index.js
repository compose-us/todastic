const winston = require("winston");

module.exports = { initLogger };

function initLogger() {
  const options = {
    /* file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  }, */
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      format: winston.format.simple(),
      colorize: true
    }
  };
  const logger = winston.createLogger({
    transports: [
      //    new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false // do not exit on handled exceptions
  });
  logger.stream = {
    write: function(message, _) {
      logger.info(message);
    }
  };

  return logger;
}
