// This test should ONLY close the webdriver and should (probably)
// never be modified. Any E2E test suite will have this test
// injected to close the selenium webdriver.
test.describe('Close browser', function() {
  test.before(function() {
    e2e.closeBrowser();
  });

  test.it('close selenium browser/driver', function() {
    // TODO: Assert browser closed (somehow check selenium session ID?)
  });
});
