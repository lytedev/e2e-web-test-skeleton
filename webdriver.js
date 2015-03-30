var assert = require('assert');
var fs = require('fs');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

test.describe('Site index', function() {
    this.timeout(15000);
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.phantomjs())
            .build();
    });

    test.beforeEach(function() {
        driver.get('http://emfluence.com/');
    });

    test.it('has correct title', function() {
        driver.getTitle().then(function(title) { 
            assert.equal(title, "Digital Marketing - Email Marketing - Interactive Marketing | emfluence");
        });
    });

    test.it('has #logo element', function() {
        driver.findElement(webdriver.By.id('logo'));
    });

    test.after(function() {
        driver.quit();
    });

});

