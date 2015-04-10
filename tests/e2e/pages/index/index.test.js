var IndexPage = require('./index.page_spec');

test.describe('Site index page', function() {
  var page = new IndexPage(this);

  e2e.getBrowserBefore(this); // Load browser, get page via spec url

  test.it('has correct title', function() {
    page.get();
    e2e.checkTitle(page.expectedPartialTitle, true);
  });

  test.it('has #logo element', function() {
    e2e.checkSelector(page.logoElementSelector);
  });

  e2e.closeBrowserAfter(this); // Close browser
});
