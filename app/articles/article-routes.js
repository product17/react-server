'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path');

// Controller
var home = require('./article-render');

router.route('/:id')
    .get(home.article);



module.exports = router;
