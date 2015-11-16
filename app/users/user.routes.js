'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path');

// Controller
var user = require('./user.presenter');

// Route list
router.route('/')
    .get(user.list);


// Export
module.exports = router;
