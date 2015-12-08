'use strict';

var express 		= require('express'),
    clientRouter 	= express.Router(),
    adminRouter  	= express.Router(),
    path    		= require('path');

// Controller
var article = require('./article.presenter'),
	admin 	= require('./article.presenter.admin');


/**
 * Client routes
 * root: /article/
 */
clientRouter.route('/:id')
    .get(article.byId);



/**
 * Admin routes
 * root: /admin/article/
 */
adminRouter.route('/')
	.get(admin.index);

adminRouter.route('/new')
	.get(admin.createForm)
	.post(admin.create);


module.exports.client = clientRouter;
module.exports.admin = adminRouter;
