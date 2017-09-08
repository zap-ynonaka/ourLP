var gulp = require("gulp");
var plumber = require("gulp-plumber");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var frontnote = require("gulp-frontnote");

gulp.task("sass", function() {
  gulp.src("sass/**/*scss")
    .pipe(plumber())
    .pipe(frontnote({
        css: '../css/style.css'
    }))
    .pipe(sass({
      outputStyle: 'compact'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest("../LP/css"));
});

var uglify = require("gulp-uglify");
gulp.task("js", function() {
  gulp.src(["js/**/*.js","!js/min/**/*.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("../LP/js/min"));
});

var imagemin = require("gulp-imagemin");
gulp.task("imageMinTask", function() {
  gulp.src("images/*.png")
    .pipe(imagemin())
    .pipe(gulp.dest("minified_images/"));
});

gulp.task("default", function() {
  gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
  gulp.watch("sass/**/*.scss",["sass"]);});