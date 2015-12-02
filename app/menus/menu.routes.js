'use strict';

var express = require('express'),
    router  = express.Router();

// Controller
var menu = require('./menu.presenter');

// Route list
router.use('/', menu.add_top_menu);


// Export
module.exports = router;
