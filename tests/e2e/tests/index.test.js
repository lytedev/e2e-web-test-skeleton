var IndexPageSpec = e2e.getSpec('index.page_spec');

test.describe('Site index page', function() {
  var page = new IndexPageSpec(this);

  test.it('has logo element', function() {
    page.get();

    e2e.checkSelector(page.logoSelector);
  });

  test.it('has correct title', function() {
    page.get();

    e2e.checkTitle(page.expectedPartialTitle, true);
  });
});
