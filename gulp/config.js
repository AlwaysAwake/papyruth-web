var dest = './dist';
var src = './src';
var gutil = require('gulp-util');

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : gutil.env.type;

module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      https: true,
      port: 8080,
      livereload: {
        port: 35929
      }
    }
  },
  sass: {
    src: src + '/assets/stylesheets/**/!(application)*.{sass,scss,css}',
    dest: dest + '/styles',
    output: 'main.css',
    settings: {
      indentedSyntax: false, // Enable .sass syntax?
      imagePath: '/images', // Used by the image-url helper
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : ''
    }
  },
  browserify: {
    settings: {
      transform: ['babelify', 'reactify', 'envify']
    },
    src: src + '/scripts/app.js',
    dest: dest + '/js',
    outputName: 'bundle.js',
    debug: process.env.NODE_ENV === 'dev'
  },
  copy: {
    html: {
      src: src + '/index.html',
      dest: dest
    },
    fonts: {
      src: src + '/assets/fonts/**',
      dest: dest + '/fonts/'
    },
    images: {
      src: src + '/assets/images/**',
      dest: dest + '/images/'
    },
    styles: {
      src: src + '/assets/stylesheets/application.css',
      dest: dest + '/styles/'
    }
  },
  watch: {
    src: 'src/**/*.*',
    tasks: ['build']
  }
};
