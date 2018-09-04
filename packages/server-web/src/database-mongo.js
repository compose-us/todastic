const connectMongo = require("connect-mongo");
const { Mongoose } = require("mongoose");
const session = require("express-session");

// https://mongoosejs.com/docs/api.html#mongoose_Mongoose
// https://mongoosejs.com/docs/connections.html#callback

module.exports = { initDatabase };

async function initDatabase({ config, logger }) {
  const mongoose = await createMongooseInstance({ connectionString: config.get("db.connectionString"), logger });
  logger.debug("mongooseInstance created");
  return {
    mongoose,
    async setupMiddlewareForExpressSession(sessionOptions) {
      logger.info("Setting up middleware for express session");
      const MongoStore = connectMongo(session);
      const mongoStore = await new Promise((resolve, reject) => {
        const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });

        const resolver = () => {
          mongoStore.removeListener("disconnected", rejecter);
          logger.info("Successfully connected MongoStore");
          resolve(mongoStore);
        };
        const rejecter = () => {
          mongoStore.removeListener("connected", resolver);
          logger.error("Could not connect MongoStore");
          reject(new Error("Could not connect MongoStore"));
        };
        mongoStore.once("connected", resolver);
        mongoStore.once("disconnected", rejecter);
      });

      sessionOptions.store = mongoStore;
      storeName = "mongo";
      return { middleware: session(sessionOptions), storeName };
    }
  };
}

async function createMongooseInstance({ connectionString, logger }) {
  logger.debug("Starting createMongooseInstance");
  const mongooseInstance = new Mongoose();
  return mongooseInstance.connect(
    connectionString,
    { useNewUrlParser: true }
  );
}
