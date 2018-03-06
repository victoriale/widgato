var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default; // works with ES6
var inject = require('gulp-js-text-inject'); // used to parse out using RegExp ( @@import {filename.**} ) in javascript files and replacing them with inline contents from those filename.**
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');


// /*******************************Minify Core Metrics**************************/
gulp.task('clean', function () {
    return gulp.src([
          'min/*'
        ], {read: false})
        .pipe(clean({force: true}))
});

gulp.task('webpack', ['clean'], function () {
    return gulp.src([
            'js/main.js'
        ])
        .pipe(webpack({
          output:{
            filename: 'main.min.js'
          },
          module: webpackConfig.module,
          plugins:webpackConfig.plugins,
          devtool: 'source-map',
        }))
        .pipe(gulp.dest('min'));
});

gulp.task('default', ['webpack'], function () {
    // place code for your default task here
});

// RUN BELOW WHEN YOU ARE DEVELOPING but run GULP DEFAULT TASK to do single clean build instead of a watch
gulp.task('watch', ['clean'], function () {
    return gulp.src([
            'js/main.js'
        ])
        .pipe(webpack({
          watch:true,
          output:{
            filename: 'main.min.js'
          },
          module: webpackConfig.module,
          plugins:webpackConfig.plugins,
          devtool: 'source-map',
        }))

        .pipe(gulp.dest('min'));
});
