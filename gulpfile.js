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
var clean            = require('gulp-clean');
var rename            = require('gulp-rename');

gulp.task('clean', function() {
  return gulp
        .src('deepdive/bar/bar.js', {read: false})
        .pipe(clean({force: true}))
});

gulp.task('sportsbar-css', function() {
  return gulp
  .src(['deepdive/bar/bar.css', 'deepdive/fonts/deepdive_bar/styles.css','deepdive/bar/lato.css'])
  .pipe(concatCss('bar.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('deepdive/bar'));
});


gulp.task('sportsbar-babel', function(){
  return gulp
  .src(['deepdive/bar/bar.unminified.js'])
  .pipe(include())
  .pipe(removeEmptyLines())
  .pipe(strip())
  .pipe(trimLines())
  .pipe(rename('bar.js'))
  .pipe(gulp.dest('deepdive/bar/'));
});

gulp.task('sportsbar-scripts', ['sportsbar-babel'], function() {
  return gulp
  .src(['deepdive/lib/fuse_2.5.0.min.js','deepdive/bar/bar.js'])
  .pipe(concat('bar.js'))
  .pipe(gulp.dest('deepdive/bar/'));
});

gulp.task('default', ['clean','sportsbar-css','sportsbar-scripts'], function() {
  // place code for your default task here
});
