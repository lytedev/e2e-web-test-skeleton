var IndexPage = require('./index.page_spec');

test.describe('Site index', function() {
  var page = new IndexPage();
  page.preSetup(this);

  e2e.defaultTestBefore(this); // Load browser, get page via spec url

  test.it('has correct title', function() {
    e2e.checkTitle(page.expectedPartialTitle, true);
  });

  test.it('has #logo element', function() {
    e2e.checkSelector(page.logoElementSelector);
  });

  e2e.defaultTestAfter(this); // Close browser
});
