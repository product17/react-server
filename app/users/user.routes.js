'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path');

// Controller
var presenter 	= require('./user.presenter'),
	controller 	= require('./user.controller');

// Route list
router.route('/')
    .get(presenter.list);

router.route('/new')
	.get(presenter.create_form)


// Export
module.exports = router;
