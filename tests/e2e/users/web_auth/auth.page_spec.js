var LoginPage = function(test) {
  e2e.defaultPageSpec(this, test);

  this.url += "/user";

  this.usernameSelector = "#edit-name";
  this.passwordSelector = "#edit-pass";
  this.submitSelector = "#edit-submit";
  this.logoutSelector = "#toolbar-user .logout a";

  this.goodUsername = "dflanagan";
  this.goodPassword = "veritable_nightmare";
  this.badUsername = 's0m3_p00r_d00d';
  this.badPassword = 't0t4l_f41lur3';

  this.defineLoginElements = function() {
  	this.usernameElement = e2e.findElement(this.usernameSelector);
  	this.passwordElement = e2e.findElement(this.passwordSelector);
  	this.submitElement = e2e.findElement(this.submitSelector);
  };

  this.defineLogoutElements = function() {
  	this.logoutElement = e2e.findElement(this.logoutSelector);
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

  this.login = function() {
    this.get();
    this.defineLoginElements();
    return this.submitLoginForm();
  }

  this.submitLoginForm = function() {
    this.setUsername(this.goodUsername);
    this.setPassword(this.goodPassword);
    return this.submit();
  };

  this.submitBadLoginForm = function() {
    this.setUsername(this.badUsername);
    this.setPassword(this.badPassword);
    return this.submit();
  };

  this.logout = function() {
    this.defineLogoutElements();
    return this.clickLogoutButton();
  }

  this.clickLogoutButton = function() {
  	return this.logoutElement.click();
  };
};

module.exports = LoginPage;
