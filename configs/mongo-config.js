'use strict';

var env = process.env.NODE_ENV;

var config = {
  development: {
    db_path: 'mongodb://localhost/newsroom',
  },
  production: {
    db_path: 'mongodb://localhost/newsroom',
  }
}

module.exports.wat = function () {
  return config[env];
};
