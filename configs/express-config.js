'use strict';

/**
 * Module dependencies.
 */
var fs             = require('fs'),
    http           = require('http'),
    https          = require('https'),
    express        = require('express'),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    session        = require('express-session'),
    compress       = require('compression'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    helmet         = require('helmet'),
    passport       = require('passport'),
    glob           = require('glob'),
    uuid           = require('uuid'),
    multer         = require('multer'),
    mongoose       = require('mongoose'),
    mongoStore     = require('connect-mongo')(session),
    flash          = require('connect-flash'),
    config         = require('./config'),
    path           = require('path'),
    regional       = require(path.join(__libs, 'regional-codes'));

    /**
     * Normalize a port into a number, string, or false.
     */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {

        // named pipe
        return val;
    }

    if (port >= 0) {

        // port number
        return port;
    }

    return false;
}

module.exports = function(db) {

    // Initialize express app
    var app = express();

    app.set('port', config.port);

    // Globbing model files
    glob('./app/**/*.model.js', {sync: true}).forEach(function(modelPath) {
      require(path.resolve(modelPath));
    });

    // Setting application local variables
    // app.locals.title = config.app.title;
    // app.locals.description = config.app.description;
    // app.locals.keywords = config.app.keywords;
    // app.locals.facebookAppId = config.facebook.clientID;
    // app.locals.jsFiles = config.getJavaScriptAssets();
    // app.locals.cssFiles = config.getCSSAssets();

    // Passing the request url to environment locals
    app.use(function(req, res, next) {
      res.locals.url = req.protocol + '://' + req.headers.host + req.url;
      next();
    });

    // Should be placed before express.static
    app.use(compress({
      filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));

    // Showing stack errors
    app.set('showStackError', true);

    // view engine setup
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '../app/views'));

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
      // Enable logger (morgan)
      app.use(morgan('dev'));

      // Disable views cache
      app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
      app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // CookieParser should be above session
    app.use(cookieParser());

    // Express MongoDB session storage
    app.use(session({
      saveUninitialized: false,
      resave: false,
      secret: config.sessionSecret,
      cookie: {
        secure: 'auto',
        maxAge: 2628000000,
      },
      store: new mongoStore({
        url: config.app.db_path,
      })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages
    app.use(flash());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Setting the app router and static folder
    app.use('/public', express.static(path.join(__dirname, '../public')));

    app.use(regional.getCountry);

    // Routes need to be included before Error handling
    app.use(require('../app/routes'));

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
      // If the error object doesn't exists
      if (!err) return next();

      // Log it
      console.error(err.stack);

      if (err.message.slice(0,3) === '404') {
        // Error page
        res.status(404).render('error', {
          error: 'Not Found',
          url: req.originalUrl,
          status: 404,
        });
      } else {
        // Error page
        res.status(500).render('error', {
          error: err.stack,
          url: req.originalUrl,
          status: 500,
        });
      }
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
      res.status(404).render('error', {
        url: req.originalUrl,
        error: 'Not Found',
        satus: 404,
      });
    });

    // if (process.env.NODE_ENV === 'secure') {
    //  // Log SSL usage
    //  console.log('Securely using https protocol');
    //
    //  // Load SSL key and certificate
    //  var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
    //  var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');
    //
    //  // Create HTTPS Server
    //  var httpsServer = https.createServer({
    //    key: privateKey,
    //    cert: certificate
    //  }, app);
    //
    //  // Return HTTPS server instance
    //  return httpsServer;
    // }

    // Return Express server instance
    return app;
};
