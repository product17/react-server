'use strict';

var _           = require('lodash'),
    Promise     = require('bluebird'),
    formHelper  = require('../forms').helper,
    mongoose    = require('mongoose'),
    User        = mongoose.model('User');



module.exports.getFormSchema = function (field_list) {
  var schema  = User.schema.tree;

  var list = _.map(field_list, function (item, key) {

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
        user.password = undefined;
        user.salt = undefined;

        resolve(user);
      }
    });
  });
}


module.exports.list = function () {
  return new Promise(function (resolve, reject) {
    User.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}
