'use strict';

module.exports.mainMenu = function (loc) {

    /**
     * We can run language logic here
     */
    
    var lang_map = {}

    var menu = {
        logo: {
            url: '/',
            img_url: '/public/images/logos/concur_logo.png',
            alt_text: 'Concur Logo',
        },
        breadcrumb: {
            home: {
                text: 'NEWSROOM',
                url: '/',
            },
            current: {
                text: 'EVENTS',
            }
        },
        topics: {
            label: 'TOPICS',
        }
    }

    return menu;
}

module.exports.sapMenu = function (loc) {

    /**
     * Run language logic here
     */
    
    var menu = {
        logo: {
            url: 'http://go.sap.com',
            img_url: '/public/images/logos/sap-logo.png',
            alt_text: 'SAP Logo',
        },
        learn: {
            label: 'Concur is now part of SAP.',
            link_text: 'Learn more',
            url: 'https://www.concur.com/sap'
        },
        about: {
            text: 'About SAP',
            url: 'http://go.sap.com',
        },
    }

    return menu;
}

module.exports.footerMenu = function (lang) {

    /**
     * Run Language Logic her
     */

    var menu = {
        social: [
            {
                network: 'facebook',
                url: 'https://www.facebook.com/Concur',
            },
            {
                network: 'twitter',
                url: 'https://twitter.com/Concur',
            },
            {
                network: 'linkedin',
                url: 'https://www.linkedin.com/groups/149969/profile',
            },
            {
                network: 'google-plus',
                url: 'https://plus.google.com/+concur/posts',
            },
        ],
        info_links: [
            {
                text: 'SERVICE STATUS',
                url: 'http://concuropenstatus.concur.com/',
            },
            {
                text: 'CONTACT',
                url: 'https://www.concur.com/en-us/contact',
            },
            {
                text: 'WEBSITE FEEDBACK',
                url: 'https://www.concur.com/en-us/website-feedback',
            },
        ],
        copyright: {
            text: '© Copyright 2015 Concur Technologies, Inc. All rights reserved.',
            link_text: 'Privacy Policy',
            url: 'https://www.concur.com/en-us/privacy-policy',
        },
        country_selector: {
            text: 'COUNTRY SELECTOR',
        },
    };

    return menu;
}