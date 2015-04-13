// This test should ONLY start the webdriver and should (probably)
// never be modified. Any E2E test suite will have this test
// injected to start the selenium webdriver.
test.describe('Start browser', function() {
  test.before(function() {
    e2e.getBrowser();
  });

  test.it('setup selenium browser/driver', function() {
    assert.ok(e2e.driver);
  });
});
