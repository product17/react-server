'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path');

// Controller
var home = require('./home-controller');

router.route('/')
    .get(home.index);

router.route('/login')
    .get(home.index);

router.route('/about')
    .get(home.index);


module.exports = router;