var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var exit = require('gulp-exit');
var config = require('../config').watch;

gulp.task('build', ['browserify', 'styles', 'copy'], function() {
  gulp.src(config.src)
    .pipe(gutil.env.afterbuild ? exit() : connect.reload());
});
