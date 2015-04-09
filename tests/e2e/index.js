fs = require('fs');
webdriver = require('selenium-webdriver');
test = require('selenium-webdriver/testing');
chai = require('chai');
chaiAsPromised = require('chai-as-promised');
assert = chai.assert;

var E2EBase = function() {
  var e2e = this;

  this.defaultPageSpec = function(that) {
    that.timeout = process.env.baseDriverTimeout;
    that.url = process.env.rootTestUrl;
    that.preSetup = this.defaultPagePreSetup;
    that.get = this.defaultPageGet;
  };

  this.defaultPagePreSetup = function(that) {
    that.timeout(this.timeout);
    that.page = this;
  };

  this.defaultPageGet = function() {
    if (typeof driver === 'undefined') {
      e2e.getBrowser();
    }
    return driver.get(this.url);
  };

  this.defaultTestBeforeEach = function(that) {
    // Sometimes we want to get the page before each test
    return test.beforeEach(function() {
      that.page.get();
    });
  };

  this.defaultTestBefore = function(that) {
    return test.before(function() {
      e2e.getBrowser();
      that.page.get();
    });
  };

  this.defaultTestAfter = function(that) {
    return test.after(function() {
      driver.quit();
    })
  };

  this.getBrowser = function() {
    driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.phantomjs())
      .build();
    return driver;
  };

  this.checkTitle = function(expectedTitle, partial) {
    // If partial is truthy, we only expect the title to _contain_ the expectedTitle
    if (typeof partial === 'undefined') {
      partial = false;
    }
    if (partial == true) {
      return driver.getTitle().then(function(title) {
        assert.include(title, expectedTitle);
      });
    } else {
      return driver.getTitle().then(function(title) {
        assert.equal(title, expectedTitle);
      });
    }
  };

  this.checkSelector = function(selector) {
    return driver.findElement(webdriver.By.css(selector));
  };
};

e2e = new E2EBase();
