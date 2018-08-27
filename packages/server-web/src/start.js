const config = require("@todastic/config");
const { createUserModel } = require("@todastic/storage-users");
const { startServer } = require("./server.js");
const { initDatabase } = require("./database-mongo.js");
const { initLogger } = require("@todastic/logging");

const logger = initLogger();

start()
  .then(() => {
    logger.info("Done.");
  })
  .catch(err => {
    logger.error(err);
    logger.error(err.stack);
  })
  .then(() => logger.end());

async function start() {
  logger.info("Starting to set up server");
  const database = await initDatabase({ config, logger });
  logger.info("Database connection set up");
  const User = createUserModel({ mongoose: database.mongoose });
  await startServer({ config, database, User, logger });
  logger.info("Server started");
}
