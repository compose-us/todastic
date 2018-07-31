const convict = require('convict');
const path = require('path');
// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
    arg: "node-env"
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
    arg: "ip-address"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
    arg: "port"
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: '*',
      default: 'localhost',
      env: "DB_HOST",
      arg: "db-host"
    },
    user: {
      doc: "Database username",
      format: String,
      default: 'user',
      env: "DB_USER",
      arg: "db-user"
    },
    password: {
      doc: "Database password",
      format: String,
      default: 'password',
      env: "DB_PASSWORD",
      arg: "db-password"
    },
    port: {
      doc: "Database port",
      format: 'port',
      default: 27017,
      env: "DB_PORT",
      arg: "db-port"
    },
    database: {
      doc: "Database name",
      format: String,
      default: 'users',
      env: "DB_DATABASE",
      arg: "db-database"
    }
  }
});

// Load environment dependent configuration
let env = config.get('env');
let filename = path.resolve(`${__dirname}/../config/${env}.json`);
try {
  config.loadFile(filename);
} catch(e) {
  console.log(`Couldn't find config file ${filename}`);
}

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;
