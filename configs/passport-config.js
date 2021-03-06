'use strict';

/**
 * Module dependencies.
 */
var passport 	= require('passport'),
	User 		= require('mongoose').model('User'),
	path 		= require('path'),
	glob 		= require('glob');

/**
 * Module init function.
 */
module.exports = function() {

	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, {password: 0, salt: 0}, function(err, user) {
			done(err, user);
		});
	});

	// Initialize strategies
	glob('./configs/strategies/*.js', {sync: true}).forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};
