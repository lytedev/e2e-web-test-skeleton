// Load the modules our "inheriting" tests will use
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

  this.getSpec = function(spec) {
    return require('./specs/' + spec + ".js");
  }

  this.callAs = function(callback, object, args) {
    if (typeof args === 'undefined') {
      args = [];
    }
    return function() { callback.apply(object, args); };
  };

  this.defaultPageSpec = function(that, test) {
    that.timeout = process.env.baseDriverTimeout;
    that.url = process.env.rootTestUrl;
    that.preSetup = this.defaultPagePreSetup;
    that.get = this.defaultPageGet;
    that.test = test;
    that.test.timeout(that.timeout);
  };

  this.defaultPagePreSetup = function(test) {
    if (typeof test !== 'undefined') {
      this.test = test;
    }
    this.test.timeout(this.timeout);
  };

  this.defaultPageGet = function() {
    return e2e.driver.get(this.url);
  };

  this.getBrowserBeforeEach = function(that, cb) {
    if (typeof cb === 'undefined') {
      cb = function() { };
    }
    return test.beforeEach(function() {
      cb();
      e2e.getBrowser();
    });
  };

  this.getBrowserBefore = function(that, cb) {
    if (typeof cb === 'undefined') {
      cb = function() { };
    }
    return test.before(function() {
      cb();
      e2e.getBrowser();
    });
  };

  this.closeBrowserAfterEach = function(that, cb) {
    if (typeof cb === 'undefined') {
      cb = function() { };
    }
    return test.afterEach(function() {
      cb();
      e2e.closeBrowser();
    })
  };

  this.closeBrowserAfter = function(that, cb) {
    if (typeof cb === 'undefined') {
      cb = function() { };
    }
    return test.after(function() {
      cb();
      e2e.closeBrowser();
    })
  };

  // TODO: Use the builder API properly
  this.getChromeBrowser = function() {
    if (typeof this.driver !== 'undefined') { return; }
    this.driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    return this.driver;
  };

  this.getFirefoxBrowser = function() {
    if (typeof this.driver !== 'undefined') { return; }
    this.driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox())
      .build();
    return this.driver;
  };

  this.getPhantomJSBrowser = function() {
    if (typeof this.driver !== 'undefined') { return; }
    this.driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.phantomjs())
      .build();
    return this.driver;
  };

  // TODO: Add IE, Safari, Mobile, etc.

  this.getBrowser = function() {
    var defaultBrowser = process.env.defaultBrowser;
    if (defaultBrowser == "chrome") {
      return this.getChromeBrowser();
    } else if (defaultBrowser == "firefox") {
      return this.getFirefoxBrowser();
    }
    return this.getPhantomJSBrowser();
  };

  this.closeBrowser = function() {
    if (typeof this.driver !== 'undefined') {
      return this.driver.quit();
    }
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
    return this.driver.getTitle().then(cb);
  };

  this.findElement = function(selector) {
    return this.driver.findElement(webdriver.By.css(selector));
  };

  this.findElements = function(selector) {
    return this.driver.findElements(webdriver.By.css(selector));
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
    return this.driver.getCurrentUrl().then(cb);
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
