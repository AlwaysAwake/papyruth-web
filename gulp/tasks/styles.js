var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var config = require('../config.js').sass;

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings))
    .pipe(plumber())
    .pipe(concat(config.output))
    .pipe(gulp.dest(config.dest))
    .pipe(size({ title: "styles"}))
    .pipe(connect.reload());
});
