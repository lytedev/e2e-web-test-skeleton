var fs = require('fs');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var chai = require('chai');
var assert = chai.assert;

// Configuration
var timeout = 30000;
var url = process.env.rootTestUrl;
var expectedTitle = "Digital Marketing - Email Marketing - Interactive Marketing | emfluence";
var logoElementId = "logo";

// Tests
test.describe('Site index', function() {

    this.timeout(timeout);
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.phantomjs())
            .build();
    });

    test.beforeEach(function() {
        driver.get(url);
    });

    test.it('has correct title', function() {
        driver.getTitle().then(function(title) { 
            assert.equal(title, expectedTitle);
        });
    });

    test.it('has #logo element', function() {
        driver.findElement(webdriver.By.id(logoElementId));
    });

    test.after(function() {
        driver.quit();
    });

});

