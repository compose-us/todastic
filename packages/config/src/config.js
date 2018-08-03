const convict = require("convict");
const path = require("path");
// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
    arg: "node-env"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
    arg: "port"
  },
  secret: {
    doc: "The session secret.",
    format: String,
    default: "coffeeK33psMeW4ke@n!ght",
    env: "SESSION_SECRET",
    arg: "session-secret"
  },
  sessionStore: {
    doc: "The session store. Defaults to in-memory (NOT suited for production).",
    format: String,
    default: "in-memory",
    env: "SESSION_STORE",
    arg: "session-store"
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: "*",
      default: "localhost",
      env: "DB_HOST",
      arg: "db-host"
    },
    user: {
      doc: "Database username",
      format: "*",
      default: null,
      env: "DB_USER",
      arg: "db-user"
    },
    password: {
      doc: "Database password",
      format: "*",
      default: null,
      env: "DB_PASSWORD",
      arg: "db-password"
    },
    port: {
      doc: "Database port",
      format: "port",
      default: 27017,
      env: "DB_PORT",
      arg: "db-port"
    },
    database: {
      doc: "Database name",
      format: String,
      default: "users",
      env: "DB_DATABASE",
      arg: "db-database"
    }
  }
});

// Load environment dependent configuration
let env = config.get("env");
let filename = path.resolve(`${__dirname}/../config/${env}.json`);
try {
  config.loadFile(filename);
} catch (e) {
  console.log(`Couldn't find config file ${filename}`);
}

// Perform validation
config.validate({ allowed: "warn" });

// mongo connection string
let connectionString = "mongodb://";
if (config.get("db.user")) {
  connectionString += `${config.get("db.user")}:${config.get("db.password")}@`;
}
connectionString += `${config.get("db.host")}:${config.get("db.port")}/${config.get("db.database")}`;
console.log(connectionString);

config.set("db.connectionString", connectionString);

module.exports = config;
