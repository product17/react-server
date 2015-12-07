'use strict';

var gulp        = require('gulp'),
    gulpIf      = require('gulp-if'),
    rename      = require('gulp-rename'),
    imagemin    = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize'),
    getSize     = require('image-size');


function preticate (img, w, h) {
  if ((w === 100 && h === 100) || (w === 45 && h === 45)) {
    return function () {
      if (img.width >= w && img.height >= h) {
        return true
      }
      return false;
    }
  } else {
    return false;
  }
}

/**
 * Process all the different sizes for the user image
 * @param  {Object} filesrc File information
 * @return {void}           void
 */
function processUserImage (filesrc) {
  var details = getSize(filesrc.path)
  return gulp.src(filesrc.path)

      // Optimize the image first so it only has to happen once
      .pipe(imagemin({progressive: true, optimizationLevel: 3}))

      // save 100 x 100
      .pipe(gulpIf(preticate(details, 100, 100), imageResize({
        width: 100,
        height: 100,
        crop: true
      })))
      .pipe(gulpIf(preticate(details, 100, 100), gulp.dest('public/uploads/user_image/square-100')))
      .pipe(gulpIf(preticate(details, 100, 100), rename(function (path) {
        process.send({
          url: 'public/uploads/user_image/square-100/' + path.basename + path.extname,
          key: 'small',
        });
      }), rename(function () {
        process.send(false);
      })))
      
      // save 45 x 45
      .pipe(imageResize({
        width: 45,
        height: 45,
        crop: true
      }))
      .pipe(gulpIf(preticate(details, 45, 45), gulp.dest('public/uploads/user_image/square-45')))
      .pipe(gulpIf(preticate(details, 45, 45), rename(function (path) {
        process.send({
          url: 'public/uploads/user_image/square-45/' + path.basename + path.extname,
          key: 'x_small',
        });
        process.exit();
      }), rename(function () {
        process.send(false);
        process.exit();
      })));
};

process.on('message', function (images) {

  console.log('Image processing started...');
  var stream = processUserImage(images);

  stream.on('end', function () {
    process.exit();
  });

  stream.on('error', function (err) {
    process.send(err);
    process.exit(1);
  });
});

module.exports = {};