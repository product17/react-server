'use strict';

var _           = require('lodash'),
    Promise     = require('bluebird'),
    path        = require('path'),
    formHelper  = require('../forms').helper,
    mongoose    = require('mongoose'),
    User        = mongoose.model('User'),
    procImage   = require(path.join(__libs, 'process-image'));



// This is a syncronous function, it has no database hits
module.exports.getFormSchema = function (field_list, data) {
  var schema  = User.schema.tree;
  data = data || {};

  // Map the current data values
  field_list = _.map(field_list, function (item, i) {
    if (data[item.name]) {
      item.value = data[item.name];
      return item;
    }

    return item;
  });

  var list = _.map(field_list, function (item, key) {

    if (item.override === true) {
      return item;
    }

    if (item.name === 'submit') {
      item.elem = 'submit';
      return item;
    }

    if (!schema[item.name] || !schema[item.name].form) {
      return {
        error: 'Invalid Field: ' + item.name,
        field_class: 'text-danger',
        elem: 'error',
      };;
    }

    item.elem = schema[item.name].form.elem;

    return item;
  });

  // Default to the list if there is no failure
  return list;
};

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
  
  // Add the file if it exists
  if (file) {
    user_data.user_image = {};
    user_data.user_image.link = file.path;
    procImage.processUserImage(file)
        .then(function (image) {
          console.log(image);
        });
  }

  return new Promise(function (resolve, reject) {
    User.findOne({_id: _id}, function (err, user) {

      if (err) {
        reject(err);
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
    });
    // User.findOneAndUpdate({_id: _id}, {$set: user_data}, function (err, user) {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(user);
    //   }
    // });
  });
}


/**
 * Get a paginated list of users
 * ToDo: add Pagination...
 * @return {Promise} Returns a Promise to handle the async DB call
 */
module.exports.list = function () {
  return new Promise(function (resolve, reject) {

    // Exclude password and salt for security
    User.find({}, {password: 0, salt: 0})
      .sort({'created': -1})
      .limit(20)
      .exec(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
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


