'use strict';

// Compiles the jsx for use on the server
require('babel-core/register');

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Include Components
var component_TopMenu = require('./components/build/top-menu');

// Setup Components
var TopMenu = React.createFactory(component_TopMenu.TopMenu);



// Temporary
var tmp_links = [
    {
        url: '/',
        display_name: 'home',
    },
    {
        url: '/about',
        display_name: 'about',
    },
    {
        url: '/login',
        display_name: 'login',
    },
];


module.exports.add_top_menu = function (req, res, next) {

    res.locals.reactMenu = ReactDOM.renderToString(TopMenu({links: tmp_links}));

    next();
}

// Home page render
module.exports.index = function (req, res) {
    res.render('index', {
        reactContent: ReactDOM.renderToString(TopMenu({links: tmp_links})),
        client_menu_data: {
            link_list: tmp_links,
        },
    });
}