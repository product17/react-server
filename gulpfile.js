'use strict';

var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    preprocess  = require('gulp-preprocess'),
    react       = require('gulp-react'),
    help        = require('gulp-task-listing');

gulp.task('help', help)

gulp.task('server', ['server-jsx']);

gulp.task('server-jsx', function () {
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

gulp.task('client', ['client-jsx']);

gulp.task('client-jsx', function () {
    return gulp.src('./app/**/components/src/**/*.jsx')
        .pipe(preprocess({
            context: {},
            extension: 'js'
        }))
        .pipe(react())
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('watch-jsx', function () {
    return gulp.watch('./app/**/*.jsx', ['server', 'client']);
});

gulp.task('default', ['client', 'server']);
