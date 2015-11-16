'use strict';

var env = process.env.NODE_ENV;

var config = {
  development: {
    db_path: 'mongodb://localhost/react',
  },
  production: {
    db_path: 'mongodb://localhost/react',
  }
}

module.exports = function () {
  return config[env];
};
