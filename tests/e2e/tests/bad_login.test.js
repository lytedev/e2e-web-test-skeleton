var LoginPageSpec = require('./auth.page_spec');

test.describe('User web authentication', function() {
  var LoginPage = new LoginPageSpec(this);

  test.it('login form submission fails auth with bad credentials', function() {
    // Load page
    LoginPage.get();
    LoginPage.defineLoginElements();

    LoginPage.submitBadLoginForm();

    // Make sure the login elements are still there
    LoginPage.defineLoginElements();
    e2e.checkUrl(LoginPage.url);
  });
});
