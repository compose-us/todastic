Feature("Login");

Scenario("there is a login form", I => {
  I.amOnPage("http://localhost:3000");
  I.see("Login");
});

Scenario("I can actually log in", I => {
  I.amOnPage("http://localhost:3000");
  I.fillField("Username", "John");
  I.fillField("Password", "Snow");
  I.click("Login");
  I.see("Logout");
});
