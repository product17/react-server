'use strict';

var gulp        = require('gulp'),
    gulpIf      = require('gulp-if'),
    rename      = require('gulp-rename'),
    imagemin    = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize'),
    getSize     = require('image-size');


function preticate (img, w, h) {
  if ((w === 120 && h === 120) || (w === 48 && h === 48)) {
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
      .pipe(imagemin({progressive: true, optimizationLevel: 5}))

      // save 120 x 120
      .pipe(gulpIf(preticate(details, 120, 120), imageResize({
        width: 120,
        height: 120,
        crop: true
      })))
      .pipe(gulpIf(preticate(details, 120, 120), gulp.dest('public/uploads/user_image/square-120')))
      .pipe(gulpIf(preticate(details, 120, 120), rename(function (path) {
        process.send({
          url: 'public/uploads/user_image/square-120/' + path.basename + path.extname,
          key: 'small',
        });
      }), rename(function () {
        process.send(false);
      })))
      
      // save 48 x 48
      .pipe(imageResize({
        width: 48,
        height: 48,
        crop: true
      }))
      .pipe(gulpIf(preticate(details, 48, 48), gulp.dest('public/uploads/user_image/square-48')))
      .pipe(gulpIf(preticate(details, 48, 48), rename(function (path) {
        process.send({
          url: 'public/uploads/user_image/square-48/' + path.basename + path.extname,
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