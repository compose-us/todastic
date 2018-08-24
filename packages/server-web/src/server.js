const http = require("http");
const logger = require("@todastic/logging");
const createSocketOnServer = require("@todastic/server-socket");
const startApp = require("./app.js");
const { initSession } = require("./session.js");

module.exports = { startServer };

async function startServer({ config, database, User }) {
  const { middleware: session } = await initSession({ config, database });

  // pass database
  const app = startApp({ session, logger, User });
  const httpServer = http.Server(app);
  createSocketOnServer({ httpServer, session, User });

  return new Promise((resolve, reject) => {
    httpServer.listen(config.get("port"), err => {
      if (err) {
        return reject(err);
      }
      logger.info(`Todastic webserver listening on port ${config.get("port")}, Sire!`);
      resolve(httpServer);
    });
  });
}
