'use strict';

// Compiles the jsx for use on the server
require('babel-core/register');

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Include Components
var component_helloMessage = require('./components/build/hello-message');

// Setup Components
var helloMessage = React.createFactory(component_helloMessage.HelloMessage);



// Home page render
module.exports.index = function (req, res) {
    res.render('index', {
        reactContent: ReactDOM.renderToString(helloMessage({name: "Wat Man"})),
        client_data: {
          wat: 'test',
          name: 'Wat Man',
        },
    });
}