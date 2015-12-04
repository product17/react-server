'use strict';

var express = require('express'),
    router  = express.Router(),
    path    = require('path');

// Link to the different modules for the site
var home      = require('../home').routes,
    articles  = require('../articles').routes,
    users      = require('../users').routes,
    menus     = require('../menus').routes;

// Link to menu controller
var menus_controller  = require('../menus').controller;

// Init the app
var app = express();

// Set the views for all the apps
app.set('views', path.join(__dirname, '../views'));

// Use the top menu here
app.use(menus);

// Security mask
// app.use('/admin', function(req, res, next) {

//   if (!req.isAuthenticated()) {
//     return res.status(401).send({
//       message: 'User is not logged in'
//     });
//   }

//   next();
// });

// Set the root paths

app.use('/articles', articles);
app.use('/login', users.login);
app.use('/admin/user', users.admin);
app.use('/author', users.client);
app.use('/', home);


module.exports = app;
