'use strict';

var Promise       = require('bluebird'),
    childProcess  = require('child_process'),
    path          = require('path');

module.exports.processUserImage = function (image) {
  return new Promise(function (resolve, reject) {

    // We need to spawn a child process so that we do not block 
    // the EventLoop with cpu intensive image manipulation 
    var child = childProcess.fork(path.join(__libs, 'process-image', '/process-user-image.js')),
        data  = {};

    child.on('message', function(message) {
      if (message) {
        data[message.key] = message.url;
      }
    });

    child.on('error', function(err) {
      reject(err);
    });

    child.on('exit', function() {
      resolve(data);
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