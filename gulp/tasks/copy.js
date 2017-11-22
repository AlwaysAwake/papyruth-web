var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../config').copy;

gulp.task('copy-html', function() {
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('copy-fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(size({ title: "fonts" }));
});

gulp.task('copy-images', function() {
  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest))
    .pipe(size({ title: "images" }));
});

gulp.task('copy-styles', function() {
  return gulp.src(config.styles.src)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(size({ title: "custom-styles" }));
});

gulp.task('copy', ['copy-html', 'copy-fonts', 'copy-images', 'copy-styles']);
