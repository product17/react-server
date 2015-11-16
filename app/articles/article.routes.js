'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path');

// Controller
var article = require('./article.presenter');

router.route('/:id')
    .get(article.byId);



module.exports = router;
