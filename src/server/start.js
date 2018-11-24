const config = require("./lib/config/config.js");
const { initLogger } = require("./lib/logging");
const { createEventModel } = require("./lib/model/event.js");
const { initDatabase } = require("./service/database-mongo.js");
const { createUserModel } = require("./lib/model/users.js");
const { startServer } = require("./service/server.js");

const logger = initLogger();

start()
  .then(() => {
    logger.info("Done.");
  })
  .catch(err => {
    logger.error(err);
    logger.error(err.stack);
  });

async function start() {
  logger.info("Starting to set up server");
  const database = await initDatabase({ config, logger });
  logger.info("Database connection set up");
  const User = createUserModel({ mongoose: database.mongoose });
  const Event = createEventModel({ mongoose: database.mongoose });
  const httpServer = await startServer({ config, database, User, Event, logger });
  registerShutdownHooks({ logger, httpServer, database });

  logger.info("Server started");
}

function registerShutdownHooks({ logger, httpServer, database }) {
  registerShutdownHook({ signal: "SIGTERM", logger, httpServer, database });
  registerShutdownHook({ signal: "SIGINT", logger, httpServer, database });
}

function registerShutdownHook({ signal, logger, httpServer, database }) {
  process.on(signal, () => {
    logger.info("Initiating shutdown sequence");
    logger.info("Shutting down webserver");
    httpServer.close();
    logger.info("Shutting down database connection");
    database.mongoose.disconnect().then(() => {
      logger.info("Thank you for flying with Air Todastic today. Have a nice day.");
      logger.info("Good bye.");
      logger.end();
      process.exit(0);
    });
  });
}
