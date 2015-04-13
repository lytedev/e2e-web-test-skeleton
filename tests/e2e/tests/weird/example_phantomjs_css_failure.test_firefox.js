var StyleGuidePage = require('./style_guide.page_spec');

/*
This test exists for documentation purposes, showing that (apparently) PhantomJS can be
iffy when it comes to CSS values - at least in this very specific case.
 */
test.describe('The PhantomJS webdriver will fail this test while Firefox or Chrome will succeed', function() {
  var page = new StyleGuidePage();
  page.preSetup(this);

  test.it('page header is brand color', function() {
    page.defineElements();
    e2e.checkCssValue(page.pageHeadElement, 'background-color', 'rgba(241, 178, 57, 1)');
  });

});
