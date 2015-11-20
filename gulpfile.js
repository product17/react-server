'use strict';

var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    preprocess  = require('gulp-preprocess'),
    react       = require('gulp-react');

gulp.task('jsx-components', function () {
    return gulp.src('./app/**/components/src/**/*.jsx')
        .pipe(preprocess({
            context: {
                IS_NODE: true,
            },
            extension: 'js'
        }))
        .pipe(react())
        .pipe(rename(function (path) {
          path.dirname = path.dirname.replace('src', 'build');
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('client', function () {
    return gulp.src('./app/**/components/src/**/*.jsx')
        .pipe(preprocess({
            context: {},
            extension: 'js'
        }))
        .pipe(react())
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('watch-jsx', function () {
    return gulp.watch('./app/**/*.jsx', ['jsx-components', 'client']);
});

gulp.task('default', ['client', 'jsx-components']);