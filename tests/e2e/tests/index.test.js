var IndexPageSpec = require('./index.page_spec');

test.describe('Site index page', function() {
  var IndexPage = new IndexPageSpec(this);

  test.it('has logo element', function() {
    IndexPage.get();

    e2e.checkSelector(IndexPage.logoSelector);
  });

  test.it('has correct title', function() {
    IndexPage.get();

    e2e.checkTitle(IndexPage.expectedPartialTitle, true);
  });
});
