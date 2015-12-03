'use strict';

module.exports = {
	app: {
		title: 'Concur Newsroom',
		description: 'Full-Stack JavaScript with MongoDB, Express, ReactJS, and Node.js',
		keywords: 'MongoDB, Express, ReactJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'jade',
	sessionSecret: 'Lucille',
	sessionCollection: 'sessions',
};
