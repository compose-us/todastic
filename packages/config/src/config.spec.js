const config = require("./config.js");

describe("config", () => {

  let fields = [
    { name: "application environment", field: "env" },
    { name: "service IP address", field: "ip" },
    { name: "service port", field: "port" },
    { name: "database username", field: "db.user" },
    { name: "database password", field: "db.password" },
    { name: "database host", field: "db.host" },
  ];

  for (var i = 0, len = fields.length; i < len; i++) {
    let toTest = fields[i];
    it(`let's me access ${toTest.name}`, () => {
      expect(config.get(toTest.field)).toBeDefined();
    });
  }

});
