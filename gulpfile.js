// Modules used for task-running
var gulp = require('gulp');
var mocha = require('gulp-mocha');

// Global config variables
process.env.rootTestUrl = "http://www.emfluence.com";
process.env.baseDriverTimeout = 30000;

// Tests to run (array of blobs)
testFiles = [
  'tests/e2e/index.js', // Required if running any e2e tests
  'tests/e2e/**/*.test.js',
];

// Testing task (run by default)
gulp.task('test', function() {
  return gulp.src(testFiles, { read: false })
    .pipe(mocha())
    ;
});

// Default task (only runs 'test' task at the moment)
gulp.task('default', ['test']);
