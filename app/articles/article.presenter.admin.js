'use strict';

var async     = require('async'),
    React     = require('react'),
    ReactDOM  = require('react-dom/server');

// Controller Dependencies 
var controller  = require('./article.controller'),
    Article     = require('mongoose').model('Article'),
    forms       = require('../forms');

// Include Components
var component_ArticleIndex  = require('./components/build/article-index.admin'),
    component_ArticleNew    = require('./components/build/article-new.admin');

// Setup Components
var ArticleIndex    = React.createFactory(component_ArticleIndex),
    ArticleNew      = React.createFactory(component_ArticleNew);


// Render Article
exports.index = function (req, res, next) {

    var pager = parseInt(req.query.p) || 0;

    controller.index(pager)
        .then(function (list) {
            res.render('index', {
                reactContent: ReactDOM.renderToString(ArticleIndex({list: list})),
                client_data: {
                    list: list,
                },
            });
        })
        .catch(function (err) {
            console.log(err);
            next(err);
        });
}


exports.createForm = function (req, res) {
    var formSchema = [
        {name: 'featured_image'},
        {name: 'title'},
        {name: 'content'},
        {name: 'category'},
        {name: 'tags'},
        {
            name: 'submit',
            value: 'Create Post',
            field_class: 'btn btn-success pull-right',
        },
    ];

    var articleForm = forms.getSchema(Article.schema.tree, formSchema);

    res.render('index', {
        reactContent: ReactDOM.renderToString(ArticleNew({articleForm: articleForm})),
        client_data: {
            articleForm: articleForm,
        },
    });
};

exports.create = function (req, res) {

    controller.create(req.body, req.file)
        .then(function (article) {
            console.log('pass')
            res.redirect('/admin/article');
        })
        .catch(function (err) {
            console.log(err);
        });
};

