var AuthPageSpec = e2e.getSpec('auth.page_spec');

test.describe('User web login', function() {
  var page = new AuthPageSpec(this);

  test.it('login form submission succeeds with proper credentials and user authenticates', function() {
    page.login();

    e2e.checkTitle(page.expectedUsernameInTitle, true);
    e2e.checkUrl(page.expectedUserProfileUrl);
  });
});
