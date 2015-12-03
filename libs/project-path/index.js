'use strict';

var path = require('path');

// Setup Libs path
module.exports = function () {
	global.__libs = __dirname.replace('project-path', '');
	global.__uploads = path.join(__dirname.split('libs')[0], '/public', '/uploads');
	return;
}