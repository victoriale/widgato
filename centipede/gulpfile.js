'use strict'

const clean = require('gulp-clean');
const gulp = require('gulp');
const header = require('gulp-header');
const merge = require('merge-stream');
const rename = require('gulp-rename')
const replace = require('gulp-replace');
const shell = require('gulp-shell')
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

const webpackConfig = require('./webpack.conf.js');
const igloo = require('./package.json');


/**** BUILDING ****/

gulp.task('clean', function() {
  return gulp.src([
    'filenametoclean',
  ])
  .pipe(clean());
});

gulp.task('make', ['clean'], function() {
  // Uglify settings
  var uglify_config = {
    compress: {
      unused: false, // Keep unused code because it breaks the ad stack
    },
  };

});

gulp.task('watch', ['make'], function() {
  return gulp.watch([
    'filenamestowatch'
  ], ['make']);
});

gulp.task('build', ['make']);

/**** DOCS ****/

gulp.task('clean-docs', function() {
  return gulp.src([
    'filenamestoclean'
  ])
  .pipe(clean());
});

gulp.task('docs', ['clean-docs'], shell.task([
  'shellcommandtorun',
]));

/**** TESTING ****/

gulp.task('clean-test', function() {
  return gulp.src([
    'locationtoclean',
  ])
  .pipe(clean());
});

function run_tests(name, done) {
  const karma = require('karma').Server;

  // Determine the browsers
  var browsers;
  switch ( process.platform ) {
    case 'darwin':
      browsers = [
        'Chrome',
        'Firefox',
        'Safari',
      ];
      break;
    case 'win32':
      browsers = [
        'Chrome',
        'Firefox',
        'IE',
      ];
      break;
    default:
      browsers = [
        'Chrome',
        'Firefox',
      ];
      break;
  }
  if ( name === 'unit' ) {
    browsers.push('PhantomJS');
  }

  new karma({
    browsers: browsers,
    configFile: __dirname + '/test/config/karma.conf.js',
    files: [
      'test/spec/**/*_' + name + '.js',
    ],
    htmlReporter: {
      outputDir: 'docs/tests/' + name,
      urlFriendlyName: true,
      namedFiles: true,
    },
    singleRun: true,
  }, done).start();
}

gulp.task('test_chain', ['test_chain_4']);

gulp.task('test_unit', ['clean-test'], run_tests.bind(this, 'unit'));

gulp.task('test', ['clean-test'], function(done) {
  const karma = require('karma').Server;
  const argv = require('yargs').argv;

  // Determine the browsers to use
  var browsers;
  switch ( process.platform ) {
    case 'darwin':
      browsers = [
        'Chrome',
        'Firefox',
        'Safari',
        'PhantomJS',
      ];
      break;
    case 'win32':
      browsers = [
        'Chrome',
        'Firefox',
        'IE',
        'PhantomJS',
      ];
      break;
    default:
      browsers = [
        'Chrome',
        'Firefox',
        'PhantomJS',
      ];
      break;
  }

  new karma({
    browsers: browsers,
    configFile: __dirname + '/test/config/karma.conf.js',
    singleRun: typeof argv.watch === 'undefined' ? true : false,
  }, done).start();
});
