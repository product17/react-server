'use strict';

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

// About page render
module.exports.about = function (req, res) {
    res.render('index', {
        reactContent: ReactDOM.renderToString(helloMessage({name: "Wat Man"})),
        client_data: {
          title: 'The prim and propper',
          body: '<p>The Content goes here</p>',
        },
    });
}
