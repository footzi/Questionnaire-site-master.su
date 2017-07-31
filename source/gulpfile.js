var gulp = require('gulp');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");


//pug
gulp.task('pug', function() {
    return gulp.src('templates/*.pug')
        .pipe(pug({}))
        .on('error', notify.onError({
            title: 'PUG Compilation Failed',
            message: '<%= error.message %>'
        }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('../public'))
});

//sass
gulp.task('sass', function() {
    return gulp.src('styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', notify.onError({
            title: 'SASS Compilation Failed',
            message: '<%= error.message %>'
        }))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('../public/styles'));
});

//js
gulp.task("js", function() {
    return gulp.src([
            'libs/jquery/dist/jquery.min.js',
            'libs/bootstrap/dist/js/bootstrap.min.js'
            'js/**/*'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .on('error', notify.onError({
            title: 'JS Compilation Failed',
            message: '<%= error.message %>'
        }))
        .pipe(gulp.dest('../public/js'))
})

//browserSync
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '../public'
        }
    })
});

//autoprefixer
gulp.task("autoprefixer", function() {
    return gulp.src("../public/styles/main.css")
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('../public/styles/'));
})

//images
gulp.task("images", function() {
    return gulp.src("images/**/*")
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('../public/images'))
})

//fonts

gulp.task("fonts", function() {
    return gulp.src("fonts/**/*")
        .pipe(gulp.dest("../public/fonts"))
});

//watch
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('templates/**/*.pug', ['pug'])
    gulp.watch('styles/**/*.scss', function(event, cb) {
        setTimeout(function() { gulp.start('sass'); }, 500)
    })
    gulp.watch('js/**/*.js', ['js'])
	gulp.watch('images/**/*', ['image'])
    gulp.watch('fonts/**/*', ['fonts'])
    gulp.watch('../public/*.html', browserSync.reload)
    gulp.watch('../public/js/**/*', browserSync.reload)
});

gulp.task("default", ["watch"]);