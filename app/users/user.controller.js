'use strict';

var async     = require('async'),
    _         = require('lodash'),
    mongoose  = require('mongoose'),
    User      = mongoose.model('User');



module.exports.getFormSchema = function () {
  var list = [];

  _.forOwn(User.schema.tree, function (item, key) {
    
    if (item.form) {
      list.push({
        name: key,
        field: item.form,
      });
    }
  });

  return list;
};