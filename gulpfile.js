// TODO: Add watch task(s)
// TODO: Add IE, Safari, Mobile, etc.

// Modules used for task-running
require('./config.js');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var path = require('path');

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
  // TODO: Add other browsers
  var browsers = ["phantomjs", "firefox", "chrome"];

  var createBrowserTask = function(browser) {
    var taskFunc = function() {
      process.env.defaultBrowser = browser;
      return runE2ESuite(suiteKey);
    };
    var taskName = testPrefix + browsers[i] + '-' + suiteKey;
    gulp.task(taskName, taskFunc);

    var watchTaskFunc = function() {
      process.env.defaultBrowser = browsers[i];
      var suite = forceLoadSuite(suiteKey);
      var suites = [];
      suites.push(suiteKey);
      if (typeof suite.suitesBefore !== 'undefined') {
        for (k in suite.suitesBefore) {
          suites.push(suite.suitesBefore[k]);
        }
      }
      if (typeof suite.suites !== 'undefined') {
        for (k in suite.suites) {
          suites.push(suite.suites[k])
        }
      }
      // TODO: Come up with a good way to include specs...
      var watchFiles = ['./tests/e2e/**/*spec.js'];
      for (i in suites) {
        var key = suites[i];
        watchFiles.push(actualSuiteFile(key));
        var suite = forceLoadSuite(key);
        for (k in suite.tests) {
          watchFiles.push(actualTestFile(suite.tests[k]))
        }
      }
      if (typeof suite.tests !== 'undefined') {
        for (k in suite.tests) {
          watchFiles.push(actualTestFile(suite.tests[k]))
        }
      }
      gulp.watch(watchFiles, [taskName]);
    };
    gulp.task("watch-" + taskName, [taskName], watchTaskFunc);
  }

  // Create tasks for browsers
  for (i in browsers) {
    createBrowserTask(browsers[i]);
  }

  // Default browser task and watch version
  gulp.task(testPrefix + key, [testPrefix + process.env.defaultBrowser + "-" + suiteKey]);
  gulp.task("watch-" + testPrefix + key, ["watch-" + testPrefix + process.env.defaultBrowser + "-" + suiteKey]);
};

// For every registered test suite, register the appropriate tasks
for (key in e2eSuites) {
  multiBrowserSuite(key);
}

gulp.task('default', [testPrefix + defaultSuite]);

gulp.task('watch', ["watch-" + testPrefix + defaultSuite]);

function actualSuiteFile(suiteKey) {
  var suiteFile = "";
  if (suiteKey in e2eSuites) {
    suiteFile = './tests/e2e/suites/' + e2eSuites[suiteKey] + '.js';
  } else {
    suiteFile = './tests/e2e/suites/' + suiteKey + '.js';
  }
  return suiteFile;
}

function actualTestFile(testFile) {
  var t = testFile;
  t = "./tests/e2e/tests/" + t;
  t += ".js";
  return t;
}

function forceLoadSuite(suiteKey) {
  var suiteFile = actualSuiteFile(suiteKey);
  delete require.cache[path.resolve(suiteFile)];
  return require(suiteFile);
}

// Run a single test suite
function runE2ESuite(suiteKey) {
  var suite = forceLoadSuite(suiteKey);

  runE2ESuites(suite.suitesBefore);

  if (typeof suite.tests !== "undefined") {
    for (var i = 0; i < suite.tests.length; i++) {
      suite.tests[i] = actualTestFile(suite.tests[i]);
    }
    suite.tests.splice(0, 0, './tests/e2e/index.js');
    suite.tests.splice(1, 0, './tests/e2e/tests/start_browser.test.js');
    suite.tests.push('./tests/e2e/tests/close_browser.test.js');
    var stream = runE2ETests(suite.tests);
  }

  runE2ESuites(suite.suites);

  return stream;
}

// Run a collection of test suites
function runE2ESuites(suiteKeys) {
  if (typeof suiteKeys === 'undefined') return;
  for (i in suiteKeys) {
    return runE2ESuite(suiteKeys[i]);
  }
}

// Run a collection of tests
function runE2ETests(glob) {
  return gulp.src(glob, {read: false})
    .pipe(mocha());
}
