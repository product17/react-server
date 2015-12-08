'use strict';

var Promise = require('bluebird'),
    async   = require('async'),
    path    = require('path'),
    Article = require('mongoose').model('Article');


exports.index = function (page) {
  return new Promise(function (resolve, reject) {

    var query = {
      // country_code: 
    };

    async.parallel([
      function (done) {
        Article.find(query, {password: 0, salt: 0})
            .skip((page * 1) * 10)
            .sort({'created': -1})
            .limit(10)
            .exec(done);
          },
      function (done) {
        Article.count(query, done);
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
    });
    
  });
}


/**
 * Create a new article
 * @param  {Object} article_data Posted form data
 * @param  {Object} file         Posted File
 * @return {Promise}             Promise
 */
exports.create = function (article_data, file) {
  return new Promise(function (resolve, reject) {

    var article = new Article(article_data);

    article.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(article);
      }
    });
  });
}