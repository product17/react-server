'use strict';

var _           = require('lodash'),
    async       = require('async'),
    Promise     = require('bluebird'),
    path        = require('path'),
    formHelper  = require('../forms').helper,
    mongoose    = require('mongoose'),
    User        = mongoose.model('User'),
    procImage   = require(path.join(__libs, 'process-image'));


/**
 * Post new user to DB
 * @param  {Object} user_data The data from the form (req.body)
 * @return {Promise}          Returns a Promise to handle the Async DB insert
 */
module.exports.create = function (user_data) {
  return new Promise(function (resolve, reject) {

    // Prevent someone from injecting a higher role
    delete user_data.roles;

    var user = new User(user_data);

    user.display_name = user.first_name + ' ' + user.last_name;

    user.save(function (err) {
      if (err) {
        reject(err);
      } else {

        // Security
        delete user.password;
        delete user.salt;

        resolve(user);
      }
    });
  });
}


module.exports.update = function (_id, user_data, file) {

  return new Promise(function (resolve, reject) {
    User.findOne({_id: _id}, function (err, user) {

      if (err) {
        reject(err);
      } else {

        if (file) {
          user_data.user_image = {};
          user_data.user_image.link = file.path;
          procImage.processUserImage(file)
              .then(function (image) {
                  _.extend(user, user_data);
                  _.extend(user.user_image, image);

                  user.save(function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(user);
                    }
                  });
              })
              .catch(function (err) {
                console.log(err);
              });
        } else {
          _.extend(user, user_data);

          user.save(function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          });
        }
      }
    });
  });
}


/**
 * Get a paginated list of users
 * ToDo: add Pagination...
 * @return {Promise} Returns a Promise to handle the async DB call
 */
module.exports.list = function (page) {
  return new Promise(function (resolve, reject) {

    async.parallel([
      function (done) {
        User.find({}, {password: 0, salt: 0})
            .skip((page * 1) * 10)
            .sort({'created': -1})
            .limit(10)
            .exec(done);
          },
      function (done) {
        User.count({}, done);
      },
    ], function (err, results) {
      if (err || results[0].length <= 0) {
        reject(err || new Error('404::No Content'));
      } else {
        resolve({
          data: results[0],
          count: results[1],
        });
      }
    })
    
  });
}

/**
 * Get the details of a single user by _id
 * @param  _id {String} unique selector for a user
 * @return {Promise} Returns a Promise to handle the async DB call
 */
module.exports.details = function (_id) {
  return new Promise(function (resolve, reject) {

    // Exclude password and salt for security
    User.find({_id: _id}, {password: 0, salt: 0})
      .exec(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
  });
}


module.exports.importImages = function (options) {
  return new Promise(function (resolve, reject) {
    var list = [];
    var parallel = [];
    _.forOwn(options, function (value, key) {
      if (!key) {
        return;
      }
      list.push({
        key: key,
        path: 'z_images/' + value
      })
      return;
    });

    list.forEach(function (item, i) {
      procImage.processUserImage(item)
        .then(function (image) {
          User.findOneAndUpdate({email: item.key}, {$set: {user_image: image}}, {new: true})
              .then(function (user) {
                console.log(user)
              });
        });
    });

    resolve(list);
  });
}

