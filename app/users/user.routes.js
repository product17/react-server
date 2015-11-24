'use strict';

var express     = require('express'),
    passport    = require('passport'),
    router      = express.Router(),
    path        = require('path');

// Controller
var presenter   = require('./user.presenter'),
    controller  = require('./user.controller');

// Route list
router.route('/')
    .get(presenter.list);

router.route('/new')
    // Uncomment for production to prevent random people from making accounts
    .get(/*presenter.isLoggedIn, */presenter.create_form)
    .post(/*presenter.isLoggedIn, */presenter.create);

router.route('/details/:_id')
    .get(presenter.isLoggedIn, function (req, res, next){
        console.log('test');
        next();
    }, presenter.details)

router.route('/login')
    .get(presenter.login)
    .post(passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/user/login',
        failureFlash: 'Incorrect username or password.'
    }));

router.route('/logout')
    .get(presenter.logout);

// Export
module.exports = router;
