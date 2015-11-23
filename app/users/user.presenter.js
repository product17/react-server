'use strict';

// Compiles the jsx for use on the server
require('babel-core/register');

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Include the controller
var controller = require('./user.controller');

// Include Components
var component_UserList  = require('./components/build/user-list'),
    component_UserNew   = require('./components/build/user-new');

// Setup Components
var UserList    = React.createFactory(component_UserList),
    UserNew     = React.createFactory(component_UserNew);


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
      res.redirect('/user/' + user._id);
    })
    .catch(function (err) {
      console.log(err);
      res.redirect('/');
    })
}


// Render All Users
module.exports.list = function (req, res) {
    res.render('index', {
        reactContent: ReactDOM.renderToString(UserList({users: 'wat man'})),
        client_data: {
          users: 'wat man',
        },
    });
}
