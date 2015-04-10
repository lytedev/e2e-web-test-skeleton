// Modules used for task-running
var gulp = require('gulp');
var mocha = require('gulp-mocha');

// Environment variables
process.env.rootTestUrl = "http://www.emfluence.com";
process.env.baseDriverTimeout = 30000;
process.env.defaultBrowser = "phantomjs";

// Tests to run (array of blobs)
e2eTestFiles = [
  'tests/e2e/index.js', // Required if running any e2e tests
  // 'tests/e2e/**/*.test.js',
  'tests/e2e/users/web_auth/*.test.js',
  // 'tests/e2e/pages/style-guide/*.test.js',

  // Tests for the tests
  // 'tests/e2e/pages/style-guide/example_phantomjs_css_failure.test_firefox.js',
];

// Default task (specify the task that runs when you just run `gulp`)
gulp.task('default', ['e2e-tests']);

// Tasks!
// You should never need to edit after this point
// ... But that doesn't mean you can't!

gulp.task('e2e-tests-phantomjs', function() {
  process.env.defaultBrowser = "phantomjs";
  runE2ETests();
});

gulp.task('e2e-tests-firefox', function() {
  process.env.defaultBrowser = "firefox";
  runE2ETests();
});

gulp.task('e2e-tests-chrome', function() {
  process.env.defaultBrowser = "chrome";
  runE2ETests();
});

// TODO: Add IE

gulp.task('e2e-tests', runE2ETests);

function runE2ETests() {
  return gulp.src(e2eTestFiles, { read: false })
    .pipe(mocha())
    ;
}
