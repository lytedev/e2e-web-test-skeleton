var AuthPageSpec = e2e.getSpec('auth.page_spec');

test.describe('User unsuccessful login', function() {
  var page = new AuthPageSpec(this);

  test.it('login form submission fails auth with bad credentials', function() {
    page.badLogin();

    page.defineLoginElements();
    e2e.checkUrl(page.url);
  });
});
