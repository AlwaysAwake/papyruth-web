var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var gzip = require('gulp-gzip');
var chalk = require('chalk');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var envify = require('envify');
// var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var config = require('../config').browserify;

const opts = {
  cache: {},
  packageCache: {},
  debug: config.debug,
  extensions:['.js', '.jsx']
};
var b = browserify(config.src, opts);
config.settings.transform.forEach(function(t) {
  b.transform(t);
});
var w = watchify(b);

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description)
      + '\n');
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message)
      + '\n');
  }
}

gulp.task('browserify', bundle);
w.on('update', bundle);

function bundle(){
  return w.bundle()
  // log errors if they happen
  .on('error', map_error)
  .pipe(source(config.outputName))
  .pipe(buffer())
  .pipe(process.env.NODE_ENV === 'production' ? uglify() : gutil.noop())
  // .pipe(process.env.NODE_ENV === 'production' ? gzip() : gutil.noop())
  .pipe(gulp.dest(config.dest))
  .pipe(size({ title: "scripts" }))
  // .pipe(connect.reload());
  .pipe(livereload());
}
