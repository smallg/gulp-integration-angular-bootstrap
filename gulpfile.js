var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

var paths = {
    scripts: 'src/**/*.js'
};

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('live', function () {
    var server = livereload();

    gulp.watch('src/**/*.*', function (file) {
        server.changed(file.path);
    });
});

gulp.task('minify', function () {
    gulp.src('src/app/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'watch']);


