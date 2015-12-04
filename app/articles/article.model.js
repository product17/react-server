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
        default: Date.now,
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank',
    },
    content: {
        type: String,
        default: '',
        trim: true,
    },
    category: {
        type: String,
        default: '',
        trim: true,
    },
    tags: [{
        type: String,
    }],
    seo: {
        canonical: {
            type: String,
            default: '',
        },
        custom_title: {
            type: String,
            default: '',
        },
        meta_description: {
            type: String,
            default: '',
        },
        meta_keywords: [{
            type: String,
        }],
        robots: {
            noarchive: {
                type: Boolean,
                default: False,
            },
            nofollow: {
                type: Boolean,
                default: False,
            },
            noindex: {
                type: Boolean,
                default: False,
            },
            noodp: {
                type: Boolean,
                default: False,
            },
            nosnippet: {
                type: Boolean,
                default: False,
            },
            noydir: {
                type: Boolean,
                default: False,
            },
        }
    },
    sitemap: {
        included: {
            type: Boolean,
            default: True,
        },
        priority: {
            type: Number,
            default: .5,
            min: 0,
            max: 1,
        },
    },
    opengraph: {
        type: String
    },
    google_plus: {
        type: String
    },
    redirect: {
        type: String,
    },
    scheduler: {
        start: {
            type: Date
        },
        end: {
            type: Date
        },
    },
    images: [{
        link: String,
        large_link: String,
        medium_link: String,
        small_link: String,
    }],
    featured_image: {
        link: String,
        large_link: String,
        medium_link: String,
        small_link: String,
    },
    url: {
        type: String,
    },
    country_code: {
        type: String,
        enum: regionInfo.listCountries(),
    },
    lang_code: {
        type: String,
        enum: regionInfo.listLanguages(),
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    }
}).index({url: 1, country_code: 1, lang_code: 1}, {unique: true});


ArticleSchema.pre('save', function(next) {
    var self = this;

    if(!this.seo['canonical']) {
        this.seo['canonical'] = this.url;
    }
});


mongoose.model('Article', ArticleSchema);
