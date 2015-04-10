var IndexPageSpec = function(test) {
  e2e.defaultPageSpec(this, test);

  this.expectedPartialTitle = "Email Marketing";
  this.logoSelector = "#logo";
};

module.exports = IndexPageSpec;
