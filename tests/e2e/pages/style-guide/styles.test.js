var StyleGuidePage = require('./style_guide.page_spec');

test.describe('Site styles', function() {
  var page = new StyleGuidePage();
  page.preSetup(this);

  e2e.defaultTestBefore(this); // Load browser, get page via spec url

  test.it('style guide page banner background color is gray', function() {
    page.defineElements();
    e2e.checkCssValue(page.pageBannerElement, 'background-color', 'rgba(51, 51, 51, 1)');
  });

  e2e.defaultTestAfter(this); // Close browser
});
