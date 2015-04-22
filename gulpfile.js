var gulp = require('gulp');
var mocha = require('gulp-mocha');
var path = require('path');

// Load environment configuration into environment vars
var cfg = require('./config.js');
try {
  var localcfg = require('./env.config.js');
  for (key in localcfg) {
    cfg[key] = localcfg[key];
  }
} catch (ex) {
  // Do nothing
}
for (key in cfg) {
  process.env[key] = cfg[key];
}

// This will define the prefix for all the gulp tasks. If you're not a fan of
// the very verbose task names, you can make this blank. Just be sure you're not
// going to overwrite any other tests that are added manually!
var testPrefix = process.env.testPrefix;

// Defines the suite index for creating gulp tasks
var e2eSuites = cfg.testSuites;

// Define the default test suite in a production environment
var defaultProductionSuite = "production";

// Define the default test suite in a development environment
var defaultDevSuite = "dev";

// Figure out our default test suite
var defaultSuite = process.env.environmentType;
if (process.env.environmentType === "development") {
  defaultSuite = "development";
}

// Create E2E gulp tasks from a test suite
var multiBrowserSuite = function(suiteKey) {
  // TODO: Add other browsers
  var browsers = ["phantomjs", "firefox", "chrome"];

  var createBrowserTask = function(browser) {
    var taskFunc = function() {
      process.env.defaultBrowser = browser;
      return runE2ESuite(suiteKey);
    };
    var taskName = testPrefix + suiteKey + "-" + browser;
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
      var watchFiles = ['./tests/e2e/specs/**/*.js'];
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
  gulp.task(testPrefix + suiteKey, [testPrefix + suiteKey + "-" + process.env.defaultBrowser]);
  gulp.task("watch-" + testPrefix + suiteKey, ["watch-" + testPrefix + suiteKey + "-" + process.env.defaultBrowser]);
};

// For every registered test suite, register the appropriate tasks
for (key in e2eSuites) {
  multiBrowserSuite(key);
}

// Define the default test
gulp.task('e2e-test', [testPrefix + defaultSuite]);

// Define the default gulp task (just the default test)
gulp.task('default', ['e2e-test']);

// Define the default watch test task
gulp.task('watch-e2e-test', ["watch-" + testPrefix + defaultSuite]);

// Define the default watch task (just the default watch test task)
gulp.task('watch', ['watch-e2e-test']);

// Builds a full relative path to an e2e Suite file
function actualSuiteFile(suiteKey) {
  var suiteFile = "";
  if (suiteKey in e2eSuites) {
    suiteFile = './tests/e2e/suites/' + e2eSuites[suiteKey] + '.js';
  } else {
    suiteFile = './tests/e2e/suites/' + suiteKey + '.js';
  }
  return suiteFile;
}

// Builds a full relative path to an e2e Test file
function actualTestFile(testFile) {
  var t = testFile;
  t = "./tests/e2e/tests/" + t;
  t += ".js";
  return t;
}

// Forces a reload of a test suite by cleared node's require cache
function forceLoadSuite(suiteKey) {
  var suiteFile = actualSuiteFile(suiteKey);
  delete require.cache[path.resolve(suiteFile)];
  return require(suiteFile);
}

// Run a single test suite
function runE2ESuite(suiteKey, isNotFirstCall) {
  var suite = forceLoadSuite(suiteKey);

  runE2ESuites(suite.suitesBefore);

  if (typeof suite.tests !== "undefined") {
    for (var i = 0; i < suite.tests.length; i++) {
      suite.tests[i] = actualTestFile(suite.tests[i]);
    }
    suite.tests.splice(0, 0, './tests/e2e/index.js');
    suite.tests.splice(1, 0, './tests/e2e/tests/start_browser.test.js');
    suite.tests.push('./tests/e2e/tests/close_browser.test.js');
    runE2ETests(suite.tests);
  }

  runE2ESuites(suite.suites);

  if (typeof isNotFirstCall === 'undefined') {
    return _e2eStreamStack[0]();
  }
}

// Run a collection of test suites
function runE2ESuites(suiteKeys) {
  if (typeof suiteKeys === 'undefined') return;
  for (i in suiteKeys) {
    runE2ESuite(suiteKeys[i], true);
  }
}

// Run a collection of tests in order
function runE2ETests(glob) {
  // This whole function is a silly hack since I'm not the best nodejs
  // programmer in the world... or maybe even a proper one at all. Basically,
  // we're turning the beautiful stream system node uses back into an ugly,
  // hackish call stack because I can't properly use it. I'm sure this is
  // illegal in every country ever.
  var id = _e2eStreamStack.length;
  _e2eStreamStack.push(function() {
    var stream = gulp.src(glob, {read: false})
      .pipe(mocha());
    if (_e2eStreamStack.length > id + 1) {
      stream.on('end', _e2eStreamStack[id + 1]);
    }
    return stream;
  });
}
var _e2eStreamStack = [];

