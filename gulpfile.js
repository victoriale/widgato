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
var rename           = require('gulp-rename');
var htmlmin          = require('gulp-htmlmin');
var inject           = require('gulp-js-text-inject'); // used to parse out using RegExp ( @@import {filename.**} ) in javascript files and replacing them with inline contents from those filename.**
var plumber          = require('gulp-plumber');//Use .pipe(plumber()) and place it in the beginning after source to debug if needed

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



/*******************************DYNAMIC WIDGET UNLINKED TASK**************************/
gulp.task('dwunlinked-clean', function() {
  return gulp
  .src('dynamic_widget_unlinked/min/*', {read: false})
  .pipe(clean({force: true}))
});

gulp.task('dwunlinked-html', ['dwunlinked-clean'], function() {
  return gulp
  .src(['dynamic_widget_unlinked/index.html'])
  .pipe(htmlmin({
    collapseWhitespace: true,
    quoteCharacter:"'"
  }))
  .pipe(concat('index.min.html'))
  .pipe(gulp.dest('dynamic_widget_unlinked/min'));
});

gulp.task('dwunlinked-css', ['dwunlinked-clean'], function() {
  //DEFAULT VERSION
  return gulp
  .src(['dynamic_widget_unlinked/dynamic_widget_unlinked.css'])
  .pipe(concatCss('dynamic_widget_unlinked.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dynamic_widget_unlinked/min'));
});
gulp.task('dwunlinked-css-wide', ['dwunlinked-clean'], function() {
  //WIDE VERSION
  return gulp
  .src(['dynamic_widget_unlinked/dynamic_widget_unlinked_wide.css'])
  .pipe(concatCss('dynamic_widget_unlinked_wide.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dynamic_widget_unlinked/min'));
});

gulp.task('dwunlinked-scripts', ['dwunlinked-clean','dwunlinked-html', 'dwunlinked-css', 'dwunlinked-css-wide'],function() {
    return gulp.src('dynamic_widget_unlinked/dynamic_widget_unlinked.js')
    .pipe(inject({
        basepath: 'dynamic_widget_unlinked',
    }))
    .pipe(concat('dynamic_widget_unlinked.import.js'))
    .pipe(gulp.dest('dynamic_widget_unlinked'));
});

gulp.task('dwunlinked-uglify', ['dwunlinked-clean','dwunlinked-scripts'],function() {
  gulp.src('dynamic_widget_unlinked/dynamic_widget_unlinked.import.js')
    .pipe(uglify())
    .pipe(concat('dynamic_widget_unlinked.min.js'))
    .pipe(gulp.dest('dynamic_widget_unlinked/min'))
});

gulp.task('dwunlinked', ['dwunlinked-clean','dwunlinked-uglify'], function() {
  // place code for your default task here
});
/*******************************DYNAMIC WIDGET UNLINKED TASK**************************/

//uglify function for all js files inside dodgydrone folder for the dodgydrone game
gulp.task('droneuglify', function() {
    gulp.src('dodgydrone/**/*.js')
    .pipe(uglify())
    .pipe(rename(function(path){
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('dodgydrone'))
});

//uglify function for image puzzle unlinked game
gulp.task('puzzleuglify', function() {
  gulp.src('image_puzzle_unlinked/image_puzzle_unlinked.js')
    .pipe(uglify())
    .pipe(rename('image_puzzle_unlinked.min.js'))
    .pipe(gulp.dest('image_puzzle_unlinked'))
});

//uglify function for centipede //TODO finish this later
gulp.task('centipede', function() {
  gulp.src('centipede/centipede.max.js')
    .pipe(uglify())
    .pipe(rename('centipede.js'))
    .pipe(gulp.dest('centipede'))
});


/*******************************TRIVIA WIDGET UNLINKED TASK**************************/
gulp.task('trivia-clean', function() {
    return gulp
        .src('prototypes/trivia_widget/min/*', {read: false})
        .pipe(clean({force: true}))
});

gulp.task('trivia-html', ['trivia-clean'], function() {
    return gulp
        .src(['prototypes/trivia_widget/index.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            quoteCharacter:"'"
        }))
        .pipe(concat('index.min.html'))
        .pipe(gulp.dest('prototypes/trivia_widget/min'));
});

gulp.task('trivia-css', ['trivia-clean'], function() {
    //DEFAULT VERSION
    return gulp
        .src(['prototypes/trivia_widget/standard_styles.css'])
        .pipe(concatCss('standard_styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('prototypes/trivia_widget/min'));
});
gulp.task('trivia-css-wide', ['trivia-clean'], function() {
    //WIDE VERSION
    return gulp
        .src(['prototypes/trivia_widget/wide_styles.css'])
        .pipe(concatCss('wide_styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('prototypes/trivia_widget/min'));
});

gulp.task('trivia-scripts', ['trivia-clean','trivia-html', 'trivia-css', 'trivia-css-wide'],function() {
    return gulp.src('prototypes/trivia_widget/js/main.js')
        .pipe(inject({
            basepath: 'prototypes/trivia_widget',
        }))
        .pipe(concat('main.import.js'))
        .pipe(gulp.dest('prototypes/trivia_widget'));
});

gulp.task('trivia-uglify', ['trivia-clean','trivia-scripts'],function() {
    gulp.src('prototypes/trivia_widget/main.import.js')
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('prototypes/trivia_widget/min'))
});

gulp.task('trivia', ['trivia-clean','trivia-uglify'], function() {
    // place code for your default task here
});
