var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');


/**
 * Compile files from assets/scss into web/public/css
 */
gulp.task('sass', function () {
    gulp.src('_assets/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix())
        .pipe(gulp.dest('web/public/assets/css'))
});

/**
* Compile files from assets/js into web/public/js
 */
gulp.task('js', function(){
    return gulp.src('_assets/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('web/public/assets/js'));
});

/**
 * Watch files, run & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_assets/scss/**/*.scss', ['sass']);
    gulp.watch('_assets/js/**/*.js', ['js']);
});

/**
 * Default task, running just `gulp` will compile the assets and compile the site
 */
gulp.task('default', ['sass', 'js']);