module.exports = { initSession };

async function initSession({ config, database }) {
  const sessionOptions = {
    secret: config.get("secret"),
    resave: false,
    name: "session",
    saveUninitialized: false
  };

  return database.setupMiddlewareForExpressSession(sessionOptions);
}
