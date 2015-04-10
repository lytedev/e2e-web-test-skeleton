var LoginPage = require('./auth.page_spec');

test.describe('User login failure', function() {
  var page = new LoginPage();
  page.preSetup(this);

  e2e.defaultTestBefore(this); // Load browser, get page via spec url

  test.it('login fails with bad credentials', function() {
    page.defineLoginElements();

    // Hopefully, this user never gets created...
    // Maybe use blank login info?
    page.setUsername('s0m3_p00r_d00d');
    page.setPassword('t0t4l_f41lur3');

    page.submit()
      .then(function() { page.defineLoginElements(); })
      .then(function() { e2e.checkUrl(page.url); });
  });

  e2e.defaultTestAfter(this); // Close browser
});
