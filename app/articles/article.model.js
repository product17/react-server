'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    regionInfo = require(path.join(__libs, 'regional-codes')),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    tags: {
        type: [{
            type: String,
        }],
    },
    url: {
        type: String,
    },
    country_code: {
        type: [{
            type: String,
            enum: regionInfo.listCountries(),
        }],
    },
    lang_code: {
        type: [{
            type: String,
            enum: regionInfo.listLanguages(),
        }],
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
}).index({url: 1, country_code: 1, lang_code: 1}, {unique: true});

mongoose.model('Article', ArticleSchema);
