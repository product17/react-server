'use strict';

// Setup Libs path
module.exports = function () {
	return global.__libs = __dirname.replace('libs-path', '');
}