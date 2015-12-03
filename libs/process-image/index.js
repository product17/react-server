'use strict';

var Promise       = require('bluebird'),
    childProcess  = require('child_process'),
    path          = require('path');

var editor = path.join(__libs, 'process-image', '/process-user-image.js');

console.log(editor);

module.exports.processUserImage = function (image) {
  return new Promise(function (resolve, reject) {

    // We need to spawn a child process so that we do not block 
    // the EventLoop with cpu intensive image manipulation 
    var child = childProcess.fork(editor),
        data  = {};

    child.on('message', function(message) {
      console.log(message);
    });

    child.on('error', function(err) {
      reject(err);
      console.error(err.stack);
    });

    child.on('exit', function() {
      resolve(data);
      console.log('process exited');
    });

    if (typeof image === String) {
      child.send({
        type: 'standard',
        imageUrl: image
      });
    } else {
      child.send(image);
    }
  });
}