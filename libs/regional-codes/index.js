'use strict';

// Return list of countries
module.exports.listCountries = function () {
	return ['US', 'MX', 'CA', 'UK', 'FR', 'DE', 'NL', 'HK', 'SG', 'IN', 'JP', 'AU'];
};

// Return list of languages
module.exports.listLanguages = function () {
	return ['EN', 'FR', 'ES', 'DE', 'ZH'];
};

// Return Current Country
// Middleware for the express configs
module.exports.getCountry = function (req, res, next) {
	console.log('test')
	next();
};