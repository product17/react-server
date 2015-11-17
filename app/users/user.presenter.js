'use strict';

// Compiles the jsx for use on the server
require('babel-core/register');

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Include the controller
var controller = require('./user.controller');

// Include Components
var component_UserList = require('./components/build/user-list');

// Setup Components
var UserList = React.createFactory(component_UserList.UserList);



// Home page render
module.exports.list = function (req, res) {
    res.render('index', {
        reactContent: ReactDOM.renderToString(UserList({users: 'wat man'})),
        client_data: {
          users: 'wat man',
        },
    });
}


// Create Form
module.exports.create_form = function (req, res) {
	var user_data = controller.getFormSchema();

	console.log(user_data);

	res.render('index', {
		reactContent: 'ReactDOM.renderToString({})',
		client_data: {},
	});
}