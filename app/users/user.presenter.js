'use strict';

var async     = require('async'),
    _         = require('lodash'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Include the controller
var controller  = require('./user.controller'),
    User        = require('mongoose').model('User'),
    forms       = require('../forms');

// Include Components
var component_UserList    = require('./components/build/user-list'),
    component_UserNew     = require('./components/build/user-new'),
    component_UserEdit    = require('./components/build/user-edit'),
    component_UserDetails = require('./components/build/user-details'),
    component_UserImages  = require('./components/build/user-images'),
    component_UserLogin   = require('./components/build/user-login');

// Setup Components
var UserList    = React.createFactory(component_UserList),
    UserNew     = React.createFactory(component_UserNew),
    UserEdit    = React.createFactory(component_UserEdit),
    UserDetails = React.createFactory(component_UserDetails),
    UserImages  = React.createFactory(component_UserImages),
    UserLogin   = React.createFactory(component_UserLogin);


// Create Form
module.exports.create_form = function (req, res) {
  var form_schema = [
    {name: 'first_name'},
    {name: 'last_name'},
    {name: 'email'},
    {name: 'password'},
    {
      name: 'submit',
      value: 'Create User',
      field_class: 'btn btn-success pull-right',
    },
  ];

  var form_schema = forms.getSchema(User.schema.tree, form_schema);

  form_schema.action = '/user/new';

  res.render('index', {
    reactContent: ReactDOM.renderToString(UserNew({form_schema: form_schema})),
    client_data: {
      form_schema
    },
  });
}

// Create User Handler
module.exports.create = function (req, res) {

  controller.create(req.body)
    .then(function (user) {
      console.log(user)
      res.redirect('/author/details/' + user._id);
    })
    .catch(function (err) {
      console.log(err);
      req.flash('warning', 'Failed to create user');
      res.redirect('/');
    })
}

// Render Edit page
module.exports.edit_form = function (req, res) {

  var form_base = [
    {name: 'user_image'},
    {name: 'first_name'},
    {name: 'last_name'},
    {name: 'email'},
    {name: 'web_site'},
    {name: 'twitter'},
    {name: 'bio'},
    {
      name: 'submit',
      value: 'Save',
      field_class: 'btn btn-success pull-right',
    },
  ];

  controller.details(req.params._id)
    .then(function (user) {

      var form_schema = forms.getSchema(User.schema.tree, form_base, user);

      res.render('index', {
        reactContent: ReactDOM.renderToString(UserEdit({form_schema: form_schema})),
        client_data: {
          form_schema: form_schema,
        },
      });
    })
    .catch(function (err) {
      console.log(err)
    });
}

// Update User
module.exports.edit = function (req, res) {
  controller.update(req.params._id, req.body, req.file)
    .then(function (user) {
      res.redirect('/author/details/' + req.params._id);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// View single user details
module.exports.details = function (req, res, next) {
  controller.details(req.params._id)
    .then(function (user) {
      res.render('index', {
        reactContent: ReactDOM.renderToString(UserDetails({user: user})),
        client_data: {
          user: user,
        },
      });
    })
    .catch(function (err) {

      // This should send the stack trace
      next(err);
    });
}


// Render All Users
module.exports.list = function (req, res, next) {

  // ParseInt to prevent random strings from breaking everything
  var page = parseInt(req.query.p) || 0;
  
  controller.list(page)
    .then(function (list) {
      res.render('index', {
        reactContent: ReactDOM.renderToString(UserList({user_list: list, current_page: page})),
        client_data: {
          user_list: list,
          current_page: page,
        },
      });
    })
    .catch(function (err) {

      // This should send the stack trace
      next(err);
    });
}


module.exports.login = function (req, res) {
  var form_schema = [
    {name: 'email'},
    {name: 'password'},
    {
      name: 'submit',
      value: 'Login',
      field_class: 'btn btn-primary pull-right',
    },
  ];

  var form_schema = forms.getSchema(User.schema.tree, form_schema);

  res.render('index', {
    reactContent: ReactDOM.renderToString(UserLogin({form_schema: form_schema})),
    client_data: {},
  });
}


/**
 * Test that the user is logged in or not
 */
module.exports.isLoggedIn = function(req, res, next) {

  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
};


module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}



module.exports.importImages = function (req, res) {

  var imageList = require(path.join(__libs, 'image-list'));

  controller.importImages(theList)
      .then(function (list) {
        res.render('index', {
          reactContent: ReactDOM.renderToString(UserImages({list: list})),
          client_data: {},
        });
      });
}