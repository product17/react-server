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
            url: 'https://www.concur.com/sap',
            img_url: '/public/images/logos/sap-logo.png',
            alt_text: 'SAP Logo',
        },
    }

    return menu;
}