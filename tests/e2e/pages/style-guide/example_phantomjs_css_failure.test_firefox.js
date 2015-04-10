var StyleGuidePage = require('./style_guide.page_spec');

/*
This test exists for documentation purposes, showing that (apparently) PhantomJS can be
iffy when it comes to CSS values - at least in this very specific case.
 */
test.describe('The PhantomJS webdriver will fail this test while Firefox or Chrome will succeed', function() {
  var page = new StyleGuidePage();
  page.preSetup(this);

  test.before(function() {
  	// Uncomment different browsers and see for yourself!
  	// e2e.getChromeBrowser();
  	// e2e.getFirefoxBrowser();
  	// e2e.getPhantomJSBrowser();
  	e2e.getBrowser();
  	page.get();
  });

  test.it('page header is brand color', function() {
    page.defineElements();
    e2e.checkCssValue(page.pageHeadElement, 'background-color', 'rgba(241, 178, 57, 1)');
  });

  e2e.defaultTestAfter(this); // Close browser
});
