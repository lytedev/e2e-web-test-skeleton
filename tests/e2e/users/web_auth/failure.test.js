var LoginPage = require('./auth.page_spec');

test.describe('User login failure', function() {
  var page = new LoginPage();
  page.preSetup(this);

  e2e.defaultTestBefore(this); // Load browser, get page via spec url

  test.it('login fails with bad credentials', function() {
    page.defineLoginElements();

    // Hopefully, this user never gets created...
    // Maybe use blank login info?
    page.setUsername(page.badUsername);
    page.setPassword(page.badPassword);

    page.submit()
      .then(function() { page.defineLoginElements(); })
      .then(function() { e2e.checkUrl(page.url); });
  });

  e2e.defaultTestAfter(this); // Close browser
});
