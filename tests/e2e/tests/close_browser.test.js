test.describe('Close browser', function() {
  test.before(function() {
    e2e.closeBrowser();
  });

  test.it('close selenium browser/driver', function() {
    // TODO: Assert browser closed (somehow check selenium session ID?)
  });
});
