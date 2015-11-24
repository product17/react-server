'use strict';

// Compiles the jsx for use on the server
require('babel-core/register');

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Include the controller
var controller = require('./user.controller');

// Include Components
var component_UserList    = require('./components/build/user-list'),
    component_UserNew     = require('./components/build/user-new'),
    component_UserDetails = require('./components/build/user-details'),
    component_UserLogin   = require('./components/build/user-login');

// Setup Components
var UserList    = React.createFactory(component_UserList),
    UserNew     = React.createFactory(component_UserNew),
    UserDetails = React.createFactory(component_UserDetails),
    UserLogin = React.createFactory(component_UserLogin);


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

  var form_schema = controller.getFormSchema(form_schema);

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
      res.redirect('/user/details/' + user._id);
    })
    .catch(function (err) {
      console.log(err);
      res.redirect('/');
    })
}


// Render All Users
module.exports.list = function (req, res, next) {

  controller.list()
    .then(function (list) {
      res.render('index', {
        reactContent: ReactDOM.renderToString(UserList({user_list: list})),
        client_data: {
          user_list: list,
        },
      });
    })
    .catch(function (err) {

      // This should send the stack trace
      next(err);
    });
}


module.exports.details = function (req, res, next) {
console.log(req.isAuthenticated())
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

module.exports.login = function (req, res, next) {
  var form_schema = [
    {name: 'email'},
    {name: 'password'},
    {
      name: 'submit',
      value: 'Login',
      field_class: 'btn btn-primary pull-right',
    },
  ];

  var form_schema = controller.getFormSchema(form_schema);

  res.render('index', {
    reactContent: ReactDOM.renderToString(UserLogin({form_schema: form_schema})),
    client_data: {},
  });
}

