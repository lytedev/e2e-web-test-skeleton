var StyleGuidePage = function() {
  e2e.defaultPageSpec(this);

  this.url += "/style-guide";

  this.pageBannerSelector = "#page-banner";

  this.defineElements = function() {
  	this.pageBannerElement = e2e.findElement(this.pageBannerSelector);
  };
};

module.exports = StyleGuidePage;
