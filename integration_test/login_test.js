Feature("Login");

Scenario("there is a login form", I => {
  I.amOnPage("http://localhost:3000");
  I.see("Login");
});
