var LoginPage = require('./auth.page_spec');

test.describe('User web authentication', function() {
  var page = new LoginPage(this);

  e2e.getBrowserBeforeEach(this);

  test.it('login form submission fails auth with bad credentials', function() {
    // Load page
    page.get();
    page.defineLoginElements();

    page.submitBadLoginForm();

    // Make sure the login elements are still there
    page.defineLoginElements();
    e2e.checkUrl(page.url);
  });

  test.it('login form submission succeeds with proper credentials and properly logs out', function() {
    page.login();

    // Make sure we went to our logged-in dashboard
    e2e.checkTitle('Daniel Flanagan', true);
    e2e.checkUrl(process.env.rootTestUrl + "/users/dflanagan");

    // Log out and revisit the login page
    page.get(); // Logout button should be visible on basically any page, yeah?
                // so this is probably unnecessary.
    page.logout();
    page.get();

    // If the login elements are present, we logged out successfully
    page.defineLoginElements();
  });

  e2e.closeBrowserAfterEach(this); // Close browser
});
