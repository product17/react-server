'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path');

// Controller
var menu = require('./menu-controller');

// Route list
router.route('/')
    .get(menu.index);


// Export
module.exports = router;