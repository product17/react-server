'use strict';

var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    react   = require('gulp-react');

gulp.task('jsx-components', function () {
    return gulp.src('./app/**/components/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('public/javascripts'))
        .pipe(rename(function (path) {
          path.dirname = path.dirname.replace('src', 'build');
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch-jsx', function () {
    return gulp.watch('./app/**/*.jsx', ['jsx-components']);
});