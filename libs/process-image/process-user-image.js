'use strict';

var jimp = require('jimp');

function processUserImage (filesrc) {
  jimp.read(filesrc.path)
      .then(function (image) {
        image.filterType(Jimp.PNG_FILTER_AUTO)
            .deflateLevel(3)
            .quality(75)
            .resize(120, 120)
            .write('');
      })
      .catch(function (err) {

      });
}

// var gulp        = require('gulp'),
//     gulpIf      = require('gulp-if'),
//     rename      = require('gulp-rename'),
//     imagemin    = require('gulp-imagemin'),
//     imageResize = require('gulp-image-resize'),
//     getSize     = require('image-size');


// function preticate (img, w, h) {
//   if ((w === 120 && h === 120) || (w === 48 && h === 48)) {
//     return function () {
//       if (img.width >= w && img.height >= h) {
//         return true
//       }
//       return false;
//     }
//   } else {
//     return false;
//   }
// }

// /**
//  * Process all the different sizes for the user image
//  * @param  {Object} filesrc File information
//  * @return {void}           void
//  */
// function processUserImage (filesrc) {
//   var details = getSize(filesrc.path)
//   return gulp.src(filesrc.path)

//       // Optimize the image first so it only has to happen once
//       .pipe(imagemin({progressive: true, optimizationLevel: 5}))

//       // save 120 x 120
//       .pipe(gulpIf(preticate(details, 120, 120), imageResize({
//         width: 120,
//         height: 120,
//         crop: true
//       })))
//       .pipe(gulpIf(preticate(details, 120, 120), gulp.dest('public/uploads/user_image/processed/square-120')))
//       .pipe(gulpIf(preticate(details, 120, 120), rename(function (path) {
//         process.send({
//           url: 'public/uploads/user_image/processed/square-120' + path.basename + path.extname,
//           key: 'small',
//         });
//       }), rename(function () {
//         process.send(false);
//       })))
      
//       // save 48 x 48
//       .pipe(imageResize({
//         width: 48,
//         height: 48,
//         crop: true
//       }))
//       .pipe(gulpIf(preticate(details, 120, 120), gulp.dest('public/uploads/user_image/processed/square-48')))
//       .pipe(gulpIf(preticate(details, 120, 120), rename(function (path) {
//         process.send({
//           url: 'public/uploads/user_image/processed/square-48' + path.basename + path.extname,
//           key: 'x-small',
//         });
//       }), rename(function () {
//         process.send(false);
//       })));
// };

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