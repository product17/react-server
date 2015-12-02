'use strict';

// Compiles the jsx for use on the server
require('babel-core/register');

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Include the Controller
var controller = require('./menu.controller');

// Include Components
var component_MenuMain = require('./components/build/menu-main');
var component_MenuSap = require('./components/build/menu-sap');
var component_MenuFooter = require('./components/build/menu-footer');

// Setup Components
var MenuMain = React.createFactory(component_MenuMain);
var MenuSap = React.createFactory(component_MenuSap);
var MenuFooter = React.createFactory(component_MenuFooter);



module.exports.add_main_menu = function (req, res, next) {

    var menu = controller.mainMenu('wat');

    res.locals.mainMenu = ReactDOM.renderToString(MenuMain({menu: menu}));

    next();
}


module.exports.add_sap_menu = function (req, res, next) {

    var menu = controller.sapMenu();

    res.locals.sapMenu = ReactDOM.renderToString(MenuSap({menu: menu}));

    next();
}


module.exports.add_footer_menu = function (req, res, next) {

    var menu = controller.footerMenu();

    res.locals.footerMenu = ReactDOM.renderToString(MenuFooter({menu: menu}));

    next();
}


// Home page render
module.exports.index = function (req, res) {
    res.render('index', {
        reactContent: ReactDOM.renderToString(MenuMain({links: tmp_links, logo: logo})),
        client_menu_data: {
            link_list: tmp_links,
            logo: logo,
        },
    });
}
