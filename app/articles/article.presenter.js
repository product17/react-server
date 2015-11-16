'use strict';

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Controller
var article_ctrl = require('./article.controller');

// Include Components
var component_ArticleContent = require('./components/build/article-content').ArticleContent;

// Setup Components
var ArticleContent = React.createFactory(component_ArticleContent);


// Render Article
exports.byId = function (req, res) {
    var data = article_ctrl.getArticleById();

    res.render('index', {
        reactContent: ReactDOM.renderToString(ArticleContent({article: data})),
        client_data: data,
    });
}
