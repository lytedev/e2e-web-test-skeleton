var StyleGuidePage = require('./style_guide.page_spec');
var LoginPage = require('../../users/web_auth/auth.page_spec');

test.describe('Site styles', function() {
  var sgpage = new StyleGuidePage(this);
  var lpage = new LoginPage(this);

  e2e.getBrowserBefore(this);

  test.it('style guide page banner background color is gray', function() {
    sgpage.get();
    sgpage.defineElements();
    e2e.checkCssValue(sgpage.pageBannerElement, 'background-color', 'rgba(51, 51, 51, 1)');

    lpage.get();
    sgpage.defineElements();
    lpage.defineLoginElements();
    e2e.checkCssValue(sgpage.pageBannerElement, 'background-color', 'rgba(51, 51, 51, 1)');
  });

  e2e.closeBrowserAfter(this);
});
