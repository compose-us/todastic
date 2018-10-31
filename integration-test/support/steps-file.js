"use strict";
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    loginAs(username, password) {
      this.fillField("Username", username);
      this.fillField("Password", password);
      this.click("Login");
    },

    loginForTest() {
      this.amOnPage("http://localhost:3000");
      this.loginAs("John", "Snow");
    }
  });
};
