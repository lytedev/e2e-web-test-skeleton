test.describe('Start browser', function() {
  test.before(function() {
    e2e.getBrowser();
  });
  test.it('setup selenium browser/driver', function() {
    assert.ok(e2e.driver);
  });
});
