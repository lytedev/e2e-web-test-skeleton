var LoginPage = require('./auth.page_spec');

test.describe('User login success and logout', function() {
  var page = new LoginPage();
  page.preSetup(this);

  e2e.defaultTestBefore(this); // Load browser, get page via spec url

  test.it('login succeeds with proper credentials', function() {
    page.defineLoginElements();

    // This will fail if dflanagan is rate limited.
    // Clear rate limits for dflanagan (uid 83) with this query:
    // delete from flood where identifier like "83-%";
    page.setUsername(page.goodUsername);
    page.setPassword(page.goodPassword);

    page.submit()
      .then(function() { e2e.checkTitle('Daniel Flanagan', true); })
      .then(function() { e2e.checkUrl(process.env.rootTestUrl + "/users/dflanagan"); });
  });

  test.it('user logs out', function() {
    page.defineLogoutElements();

    // If the login form elements exist on the /user page, we logged out correctly
    page.logout()
      .then(function() { page.get(); })
      .then(function() { page.defineLoginElements(); });
  })

  e2e.defaultTestAfter(this); // Close browser
});
