var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    iife = require('gulp-iife'),
    minifyCss = require('gulp-minify-css');




/**
 * Copy files from assets/img into web/public/img
 */
gulp.task('img', function() {
    return gulp.src(['assets/img/**/*'])
        .pipe(gulp.dest('web/public/img'));
});

/**
 * Copy files from assets/img into web/public/img
 */
gulp.task('img:dummy', function() {
    return gulp.src(['assets/dummy-img/**/*'])
        .pipe(gulp.dest('web/public/dummy-img'));
});

/**
 * Compile files from assets/scss into web/public/css
 */
gulp.task('sass', function () {
    return gulp.src('assets/scss/main.scss')
        .pipe(sass({
            includePaths: ['scss']
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCss())
        .pipe(gulp.dest('web/public/css'));
});

/**
* Compile files from assets/js into web/public/js
 */
gulp.task('js', function(){
    return gulp.src('assets/js/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(iife())
        // .pipe(uglify())
        .pipe(gulp.dest('web/public/js'));
});

/**
* Compile files from assets/vendor into web/public/js
 */
gulp.task('js:vendor', function(){
    return gulp.src([
            'assets/vendor/angular/angular.min.js',
            'assets/vendor/salvattore/dist/salvattore.min.js'
        ])
        .pipe(concat('vendor.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('web/public/js'));
});

/**
 * Watch files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('assets/js/**/*.js', ['js']);
});

/**
 * Default task, running just `gulp` will compile the assets and compile the jekyll site
 */
gulp.task('default', ['sass', 'js' , 'js:vendor', 'img', 'img:dummy']);