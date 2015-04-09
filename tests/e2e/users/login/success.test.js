var LoginPage = require('./login.page_spec');

test.describe('User login success', function() {
  var page = new LoginPage();
  page.preSetup(this);

  e2e.defaultTestBefore(this); // Load browser, get page via spec url

  test.it('login succeeds with proper credentials', function() {
    page.defineElements();

    // This will fail if dflanagan is rate limited.
    // Clear rate limits for dflanagan (uid 83) with this query:
    // delete from flood where identifier like "83-%";
    page.setUsername('dflanagan');
    page.setPassword('veritable_nightmare');
    page.submit().then(function() {
      e2e.checkTitle('Daniel Flanagan', true);
      driver.getCurrentUrl().then(function(url) {
        assert.equal(url, process.env.rootTestUrl + "/users/dflanagan");
      });
    });

  });

  e2e.defaultTestAfter(this); // Close browser
});
