var LoginPage = function() {
  e2e.defaultPageSpec(this);

  this.url += "/user";

  this.usernameSelector = "#edit-name";
  this.passwordSelector = "#edit-pass";
  this.submitSelector = "#edit-submit";

  this.defineElements = function() {
  	this.usernameElement = e2e.checkSelector(this.usernameSelector);
  	this.passwordElement = e2e.checkSelector(this.passwordSelector);
  	this.submitElement = e2e.checkSelector(this.submitSelector);
  };

  this.setUsername = function(s) {
  	return this.usernameElement.sendKeys(s);
  };

  this.setPassword = function(s) {
  	return this.passwordElement.sendKeys(s);
  };

  this.submit = function() {
  	return this.submitElement.click();
  };
};

module.exports = LoginPage;
