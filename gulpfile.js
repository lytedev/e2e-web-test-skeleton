var gulp = require('gulp');
var mocha = require('gulp-mocha');

// Configuration variables
process.env.rootTestUrl = "http://emfluence.com";

// Testing task (run by default)
gulp.task('test', function() {
    return gulp.src('suites/**/test*.js', { read: false })
        .pipe(mocha())
        ;
});

// Default task (only runs 'test' task at the moment)
gulp.task('default', ['test']);

