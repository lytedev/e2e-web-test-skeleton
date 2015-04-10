var StyleGuidePage = function(test) {
  e2e.defaultPageSpec(this, test);

  this.url += "/style-guide";

  this.pageBannerSelector = "#page-banner";
  this.pageHeadSelector = "#page-banner .page-title h1 .text";

  this.defineElements = function() {
  	this.pageBannerElement = e2e.findElement(this.pageBannerSelector);
  	this.pageHeadElement = e2e.findElement(this.pageHeadSelector);
  };
};

module.exports = StyleGuidePage;
