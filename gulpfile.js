// TODO: Add watch task(s)
// TODO: Add IE, Safari, Mobile, etc.

// Modules used for task-running
require('./config.js');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

// TODO: Default suites based on environment
var defaultSuite = 'auth';
// var defaultProductionSuite = ;
// var defaultDevSuite = ;

var e2eSuites = {
  "auth": 'auth.suite'
};

var multiBrowserSuite = function(suiteKey) {
  var phantomjs = function() {
    process.env.defaultBrowser = "phantomjs";
    return runE2ESuite(suiteKey);
  };
  var firefox = function() {
    process.env.defaultBrowser = "firefox";
    return runE2ESuite(suiteKey);
  };
  var chrome = function() {
    process.env.defaultBrowser = "chrome";
    return runE2ESuite(suiteKey);
  };
  // TODO: Add IE, Safari, Mobile, etc.
  var defaultBrowser = function() {
    return runE2ESuite(suiteKey);
  };
  gulp.task(process.env.e2eTestPrefix + 'phantomjs-' + key, phantomjs);
  gulp.task(process.env.e2eTestPrefix + 'firefox-' + key, firefox);
  gulp.task(process.env.e2eTestPrefix + 'chrome-' + key, chrome);
  // TODO: Add IE, Safari, Mobile, etc.
  gulp.task(process.env.e2eTestPrefix + key, defaultBrowser);
};

for (key in e2eSuites) {
  multiBrowserSuite(key);
}

gulp.task('default', [process.env.e2eTestPrefix + defaultSuite]);

function runE2ESuite(suiteKey) {
  var s = require('./tests/e2e/suites/' + e2eSuites[suiteKey] + ".js");
  // Add base classes and browser init/teardown
  for (var i = 0; i < s.tests.length; i++) {
    s.tests[i] = "./tests/e2e/tests/" + s.tests[i];
    s.tests[i] += ".js";
  }
  s.tests.splice(0, 0, './tests/e2e/index.js');
  s.tests.splice(1, 0, './tests/e2e/tests/start_browser.test.js');
  s.tests.push('./tests/e2e/tests/close_browser.test.js');
  return runE2ETests(s.tests);
}

function runE2ESuites(_, suiteKeys) {
  for (key in suiteKeys) {
    return runE2ESuite(suiteKey);
  }
}

function runE2ETests(glob) {
  return gulp.src(glob, {read: false})
    .pipe(mocha());
}
