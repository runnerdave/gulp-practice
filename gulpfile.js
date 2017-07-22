'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';

//Styles
gulp.task('styles', function () {
    console.log('starting styles task');

    return gulp.src(['public/css/reset.css', CSS_PATH])
        .pipe(plumber(function(err) {
            console.log('Styles task error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
    	.pipe(autoprefixer())
        .pipe(concat('styles.css'))
    	.pipe(minifyCss())
        .pipe(sourcemaps.write())
    	.pipe(gulp.dest(DIST_PATH))
    	.pipe(livereload());
});

//Scripts
gulp.task('scripts', function () {
    console.log('starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(function(err) {
            console.log('Styles task error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
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
    gulp.watch(CSS_PATH, ['styles'])
});

gulp.task('default', function () {
    console.log('default task');
});