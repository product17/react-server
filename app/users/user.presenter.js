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
var UserList    = React.createFactory(component_UserList.UserList),
    UserNew     = React.createFactory(component_UserNew);



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
	var form_schema = controller.getFormSchema();

	res.render('index', {
		reactContent: ReactDOM.renderToString(UserNew({form_schema: form_schema})),
		client_data: {
            form_schema
        },
	});
}