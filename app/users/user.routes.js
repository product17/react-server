'use strict';

var express 	= require('express'),
	passport 	= require('passport'),
    router  	= express.Router(),
    path    	= require('path');

// Controller
var presenter   = require('./user.presenter'),
    controller  = require('./user.controller');

// Route list
router.route('/')
    .get(presenter.list);

router.route('/new')
    .get(presenter.create_form)
    .post(presenter.create);

router.route('/details/:_id')
    .get(presenter.details)

router.route('/login')
	.get(presenter.login)
	.post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: 'Incorrect username or password.'
    }));

// Export
module.exports = router;
