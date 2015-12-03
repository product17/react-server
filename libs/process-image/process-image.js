'use strict';

var gulp        = require('gulp'),
    gulpIf      = require('gulp-if'),
    imagemin    = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize');

/**
 * Process all the different sizes for the user image
 * @param  {Object} filesrc File information
 * @return {void}           void
 */
module.exports.processUserImage = function (filesrc) {
  return gulp.src(filesrc.imageUrl)

      // Optimize the image first so it only has to happen once
      .pipe(imagemin({optimizationLevel: 5}))

      // Save 730 x 480
      .pipe(gulpIf(true, imageResize({
          width: 730,
          height: 480,
          crop: true
      })))
      .pipe(gulp.dest('public/uploads/user_image/processed/col-8'))

      // // Save 540 x 360
      // .pipe(imageResize({
      //   width: 540,
      //   height: 300,
      //   crop: true
      // }))
      // .pipe(gulp.dest('public/uploads/user_image/processed/col-6'))

      // // Save 540 x 360
      // .pipe(imageResize({
      //   width: 350,
      //   height: 200,
      //   crop: true
      // }))
      // .pipe(gulp.dest('public/uploads/user_image/processed/col-4'))

      // // save 300 x 200
      // .pipe(imageResize({
      //   width: 300,
      //   height: 200,
      //   crop: true
      // }))
      // .pipe(gulp.dest('public/uploads/user_image/processed/320'))

      // // save 120 x 120
      // .pipe(imageResize({
      //   width: 120,
      //   height: 120,
      //   crop: true
      // }))
      // .pipe(gulp.dest('public/uploads/user_image/processed/120'))
      
      // // save 48 x 48
      // .pipe(imageResize({
      //   width: 48,
      //   height: 48,
      //   crop: true
      // }))
      // .pipe(gulp.dest('public/uploads/user_image/processed/48'));
};

process.on('message', function (images) {

  console.log('Image processing started...');
  var stream = processUserImage(images);

  stream.on('end', function () {
    process.send('Image processing complete');
    process.exit();
  });

  stream.on('error', function (err) {
    process.send(err);
    process.exit(1);
  });
});

module.exports = {};