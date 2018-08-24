const logger = require("@todastic/logging");
const config = require("@todastic/config");
const { createUserModel } = require("@todastic/storage-users");
const { startServer } = require("./server.js");
const { initDatabase } = require("./database-mongo.js");

start()
  .then(() => logger.info("Done."))
  .catch(err => {
    logger.error(err);
    logger.error(err.stack);
  });

async function start() {
  logger.info("Starting to set up server");
  const database = await initDatabase({ config });
  logger.info("Database connection set up");
  const User = createUserModel({ mongoose: database.mongoose });
  await startServer({ config, database, User });
  logger.info("Server started");
}
