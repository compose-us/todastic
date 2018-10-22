Feature("Login");

Scenario("there is a login form", I => {
  I.amOnPage("http://localhost:3000");
  I.see("Login");
});

Scenario("not everybody can log in", I => {
  I.amOnPage("http://localhost:3000");
  I.loginAs("John.Doe", "password");
  I.see("Login");
  I.see("Wrong username or password.");
});

Scenario("I can actually log in", I => {
  I.loginForTest();
  I.see("Ein erstes Todo erstellen");
  I.see("Ein erstes Sub Todo erstellen");
});
