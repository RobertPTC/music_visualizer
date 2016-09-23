'use strict';

var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    nodemon = require('nodemon');

gulp.task('compileJs', function() {
    var bundler = browserify('scripts/index.js');
    return bundler.transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('compileCss', function() {
   return gulp.src('styles/*.css')
     .pipe(cleanCss())
     .pipe(concat('style.min.css'))
     .pipe(gulp.dest('dist'));
});

gulp.task('app', ['compileJs', 'compileCss'], function() {
    nodemon({
        script: 'server.js'
    });
});

gulp.task('watch', ['compileJs', 'compileCss', 'app'], function() {
    gulp.watch('scripts/*.js', ['compileJs']);
    gulp.watch('styles/*.css', ['compileCss']);
});

gulp.task('default', ['compileJs', 'compileCss', 'app', 'watch']);