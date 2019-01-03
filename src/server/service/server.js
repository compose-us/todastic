const http = require("http");
const createSocketOnServer = require("./server-socket.js");
const startApp = require("../lib/app.js");
const { initSession } = require("../lib/session.js");

module.exports = { startServer };

async function startServer({ config, database, User, Event, logger }) {
  const { middleware: session } = await initSession({ config, database });

  // pass database
  const app = startApp({ session, logger, User });
  const httpServer = http.Server(app);
  createSocketOnServer({ httpServer, session, User, Event, logger });

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