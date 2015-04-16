var StyleGuidePageSpec = e2e.getSpec('style_guide.page_spec');

test.describe('Site styles', function() {
  var page = new StyleGuidePageSpec(this);

  test.it('style guide page benner background color is gray', function() {
    page.get();
    page.defineElements();
    e2e.checkCssValue(page.pageBannerElement, 'background-color', page.expectedPageHeadBackgroundColor)
  });

});
