var StyleGuidePageSpec = require('./style_guide.page_spec');
var LoginPageSpec = require('../../users/web_auth/auth.page_spec')

test.describe('Site styles', function() {
  var StyleGuidePage = new StyleGuidePageSpec(this);
  var LoginPage = new LoginPageSpec(this);

  test.it('style guide page benner background color is gray', function() {
    StyleGuidePage.get();

    StyleGuidePage.defineElements();
    e2e.checkCssValue(StyleGuidePage.pageBannerElement, 'background-color', StyleGuidePage.expectedPageHeadBackgroundColor)
  });

});
