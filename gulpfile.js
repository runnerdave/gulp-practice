'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var SCRIPTS_PATH = 'public/scripts/**/*.js';
var DIST_PATH = 'public/dist';

//Sass
gulp.task('styles', function () {
    console.log('starting styles task');
    return gulp.src('public/scss/styles.scss')
        .pipe(plumber(function (err) {
            console.log('Styles Task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//Scripts
gulp.task('scripts', function () {
    console.log('starting scripts task');

    return gulp.src(SCRIPTS_PATH)
    	.pipe(uglify())
    	.pipe(gulp.dest(DIST_PATH))
    	.pipe(livereload());
});

// Images
gulp.task('images', function () {
    console.log('starting images task');
});

// Watch
gulp.task('watch', function () {
    console.log('starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch('public/scss/**/*.scss', ['styles'])
});

gulp.task('default', function () {
    console.log('default task');
});