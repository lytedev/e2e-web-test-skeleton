fs = require('fs');
webdriver = require('selenium-webdriver');
test = require('selenium-webdriver/testing');
chai = require('chai');
chaiAsPromised = require('chai-as-promised');
assert = chai.assert;

// TODO: (dflanagan) Maybe load the following commonly-used functions
// into the global scope as well?
// describe = test.describe;
// it = test.it;

var E2EBase = function() {
  var e2e = this;

  this.callAs = function(callback, object, args) {
    if (typeof args === 'undefined') {
      args = [];
    }
    return function() { callback.apply(object, args); };
  };

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
    var cb;
    if (partial == true) {
      cb = function(title) { assert.include(title, expectedTitle); };
    } else {
      cb = function(title) { assert.equal(title, expectedTitle); };
    }
    return driver.getTitle().then(cb);
  };

  this.findElement = function(selector) {
    return driver.findElement(webdriver.By.css(selector));
  };

  this.findElements = function(selector) {
    return driver.findElements(webdriver.By.css(selector));
  };

  // Used purely for checking that an element exists
  // We can simply use findElement as it will fail the test if it fails to find
  // a matching element
  this.checkSelector = this.findElement;

  this.checkUrl = function(expectedUrl, partial) {
    if (typeof partial === 'undefined') {
      partial = false;
    }
    var cb;
    if (partial == true) {
      cb = function(url) { assert.include(url, expectedUrl); };
    } else {
      cb = function(url) { assert.equal(url, expectedUrl); };
    }
    return driver.getCurrentUrl().then(cb);
  };

  this.checkCssValue = function(element, cssAttribute, expectedCssValue, partial) {
    if (typeof partial === 'undefined') {
      partial = false;
    }
    var cb;
    if (partial == true) {
      cb = function(cssValue) { assert.include(cssValue, expectedCssValue); };
    } else {
      cb = function(cssValue) { assert.equal(cssValue, expectedCssValue); };
    }
    return element.getCssValue(cssAttribute).then(cb);
  };
};

e2e = new E2EBase();
