var path          = require('path'),
    libs_path     = require('./libs/libs-path')(),
    favicon       = require('serve-favicon'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    helmet        = require('helmet'),
    chalk         = require('chalk'),
    mongoose      = require('mongoose'),
    mongoConfig   = require('./configs/mongo-config')();

// Setup Database connection
var db = mongoose.connect('mongodb://localhost/react', function (err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
  }
});

// Init the express application
var app = require('./configs/express-config')(db);

require('./configs/passport-config')();

// Bootstrap passport config
// require('./configs/passport-config')();

module.exports = app;
