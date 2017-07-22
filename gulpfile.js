var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

//handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

//image compression
var imagemin = require('gulp-imagemin');
var imageminOptipng = require('imagemin-optipng');
var imageminSvgo = require('imagemin-svgo');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminJpegtran = require('imagemin-jpegtran');

//file paths
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

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
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imageminOptipng(),
                imageminSvgo(),
                imageminPngquant(),
                imageminJpegRecompress(),
                imageminJpegtran()
            ]
        ))
        .pipe(gulp.dest(DIST_PATH + '/images'));
});

// handlebars
gulp.task('templates', function () {

    return gulp.src(TEMPLATES_PATH)
        .pipe(handlebars({
            handlebars: handlebarsLib
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// Watch
gulp.task('watch', ['default'], function () {
    console.log('starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(CSS_PATH, ['styles']);
    gulp.watch(TEMPLATES_PATH, ['templates']);
});

gulp.task('default', ['images', 'templates', 'styles', 'scripts'], function () {
    console.log('default task');
});