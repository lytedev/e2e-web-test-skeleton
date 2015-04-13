var AuthPageSpec = e2e.getSpec('auth.page_spec');

test.describe('Authenticated user logout', function() {
  var page = new AuthPageSpec(this);

  test.it('authenticated user click logout button in toolbar and deauthenticates', function() {
    page.logout();
    page.get();
    page.defineLoginElements();
    e2e.checkTitle('User account', true);
  });
});
