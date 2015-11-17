'use strict';

var async     = require('async'),
    _         = require('lodash'),
    mongoose  = require('mongoose'),
    User      = mongoose.model('User');



module.exports.getFormSchema = function () {
  var list = [];

  _.forOwn(User.schema.tree, function (item, key) {
    var tmp = {
      name: key,
    }
    list.push(_.extend(tmp, item));
  });
  return _.filter(list, {render: true});
};