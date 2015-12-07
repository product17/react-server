'use strict';

var express      = require('express'),
    passport     = require('passport'),
    adminRouter  = express.Router(),
    clientRouter = express.Router(),
    loginRouter  = express.Router(),
    fs           = require('fs'),
    mkdirp       = require('mkdirp'),
    path         = require('path');

var multer      = require('multer'),
    storage     = multer.diskStorage({
                    destination: function (req, file, next) {
                        var dest = path.join('public/uploads/', file.fieldname);

                        fs.exists(dest, function (exists) {
                            if (!exists) {
                                mkdirp(dest, function () {
                                    next(null, dest);
                                });
                            } else {
                                next(null, dest);
                            }
                        });
                    },
                    filename: function (req, file, next) {
                        var formatName = file.originalname.replace(/W+/g, '-').toLowerCase();
                        next(null, Date.now() + '-' + formatName);
                    },
                }),
    upload      = multer({
                    storage: storage,
                    fileFilter: function (req, file, cb) {
                        var accepted = ['image/png', 'image/jpg', 'image/jpeg'];
                        if (accepted.indexOf(file.mimetype) >= 0) {
                            cb(null, true);
                        } else {
                            cb(null, false);
                        }
                    },
                });

// Controller
var presenter   = require('./user.presenter'),
    controller  = require('./user.controller');


/**
 * Login Routes
 * root: /login/
 */
loginRouter.route('/')
    .get(presenter.login)
    .post(passport.authenticate('local', {
        successRedirect: '/admin/user',
        failureRedirect: '/login',
        failureFlash: 'Incorrect username or password.'
    }));

/**
 * Admin Routes
 * root: /admin/user/
 */
adminRouter.route('/')
    .get(presenter.list);

adminRouter.route('/new')
    // Uncomment for production to prevent random people from making accounts
    .get(/*presenter.isLoggedIn, */presenter.create_form)
    .post(/*presenter.isLoggedIn, */presenter.create);

adminRouter.route('/edit/:_id')
    .get(presenter.isLoggedIn, presenter.edit_form)
    .post(presenter.isLoggedIn, upload.single('user_image'), presenter.edit);

adminRouter.route('/logout')
    .get(presenter.logout);

adminRouter.route('/images')
    .get(presenter.importImages);


/**
 * Client Routes
 * root: /author/
 */
clientRouter.route('/details/:_id')
    .get(presenter.details);


// Export
module.exports.admin = adminRouter;
module.exports.client = clientRouter;
module.exports.login = loginRouter;