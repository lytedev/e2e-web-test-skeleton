// TODO: Add watch task(s)
// TODO: Add IE, Safari, Mobile, etc.

// Modules used for task-running
require('./config.js');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

process.env.e2eTestPrefix = "e2e-test-";
var testPrefix = process.env.e2eTestPrefix;

// TODO: Default suites based on environment
var defaultProductionSuite = "production";
var defaultDevSuite = "dev";

var e2eSuites = {
  "dev": "dev.suite",
  "development": "dev.suite",
  "prod": "production.suite", 
  "production": "production.suite",
  "auth": "auth.suite", 
};

var defaultSuite = process.env.environmentType;
if (process.env.environmentType === "development") {
  defaultSuite = "development";
}

// Create E2E gulp tasks from suite index
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
  // TODO: Add watch-style tasks
  gulp.task(testPrefix + 'phantomjs-' + key, phantomjs);
  gulp.task(testPrefix + 'firefox-' + key, firefox);
  gulp.task(testPrefix + 'chrome-' + key, chrome);
  // TODO: Add IE, Safari, Mobile, etc.
  gulp.task(testPrefix + key, defaultBrowser);
};

// For every registered test suite, register the appropriate tasks
for (key in e2eSuites) {
  multiBrowserSuite(key);
}

gulp.task('default', [testPrefix + defaultSuite]);

gulp.task('watch', ['default'], function() {
  gulp.watch('./tests/**/*.js', ['default']);
});

// Run a single test suite
function runE2ESuite(suiteKey) {
  var s = 0;
  if (suiteKey in e2eSuites) {
    s = require('./tests/e2e/suites/' + e2eSuites[suiteKey] + ".js");
  } else {
    s = require('./tests/e2e/suites/' + suiteKey + ".js");
  }
  // Add base classes and browser init/teardown
  if (typeof s.suitesBefore !== "undefined") {
    runE2ESuites(s.suitesBefore);
  }
  if (typeof s.tests !== "undefined") {
    for (var i = 0; i < s.tests.length; i++) {
      s.tests[i] = "./tests/e2e/tests/" + s.tests[i];
      s.tests[i] += ".js";
    }
    s.tests.splice(0, 0, './tests/e2e/index.js');
    s.tests.splice(1, 0, './tests/e2e/tests/start_browser.test.js');
    s.tests.push('./tests/e2e/tests/close_browser.test.js');
    var stream = runE2ETests(s.tests);
  }
  if (typeof s.suites !== "undefined") {
    runE2ESuites(s.suites);
  }
  return stream;
}

// Run a collection of test suites
function runE2ESuites(suiteKeys) {
  for (i in suiteKeys) {
    return runE2ESuite(suiteKeys[i]);
  }
}

// Run a collection of tests
function runE2ETests(glob) {
  return gulp.src(glob, {read: false})
    .pipe(mocha());
}
