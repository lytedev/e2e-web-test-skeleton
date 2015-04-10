var IndexPage = function(test) {
  e2e.defaultPageSpec(this, test);

  this.expectedPartialTitle = "Email Marketing";
  this.logoElementSelector = "#logo";
};

module.exports = IndexPage;
