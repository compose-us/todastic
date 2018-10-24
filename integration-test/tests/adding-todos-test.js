Feature("Adding todos");

Scenario("on the root node", I => {
  I.loginForTest();
  I.fillField("input", "Ein neues Todo");
  I.pressKey("Enter");
  I.see("Ein neues Todo");
});
