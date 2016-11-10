var gulp             = require('gulp');
var cleanCSS         = require('gulp-clean-css');
var concatCss        = require('gulp-concat-css');
var concat           = require('gulp-concat');  
var uglify           = require('gulp-uglify');  
var include          = require("gulp-include");
var babel            = require('gulp-babel');
var strip            = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
var trimLines        = require('gulp-trimlines');

gulp.task('sportsbar-css', function() {
  return gulp
  .src(['deepdive/bar/app/bar.css', 'deepdive/fonts/styles.css','deepdive/bar/app/lato.css'])
  .pipe(concatCss('bar.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('deepdive/bar'));
});

gulp.task('sportsbar-babel', function(){
  return gulp
  .src(['deepdive/bar/app/bar.unminified.js'])
  .pipe(include())
  .pipe(removeEmptyLines())
  .pipe(strip())
  .pipe(trimLines())
  .pipe(gulp.dest('deepdive/bar/app/tmp'));
});

gulp.task('sportsbar-scripts', ['sportsbar-babel'], function() {  
  return gulp
  .src(['deepdive/lib/fuse_2.5.0.min.js','deepdive/bar/app/tmp/bar.unminified.js'])
  .pipe(concat('bar.min.js'))
  .pipe(gulp.dest('deepdive/bar/'));
});

gulp.task('default', ['sportsbar-css','sportsbar-scripts'], function() {
  // place code for your default task here
});
