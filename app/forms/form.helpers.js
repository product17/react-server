'use strict';

var _ = require('lodash');

// This is a syncronous function, it has no database hits
module.exports.getSchema = function (schema, field_list, data) {
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
      };
    }

    item.elem = schema[item.name].form;

    return item;
  });

  // Default to the list if there is no failure
  return list;
};
