'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	path = require('path'),
	regionInfo = require(path.join(__libs, 'regional-codes')),
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	first_name: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name'],
		form: {
			elem: 'input',
		},
	},
	last_name: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name'],
		form: {
			elem: 'input',
		},
	},
	display_name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address'],
		form: {
			elem: 'input',
		},
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer'],
		form: {
			elem: 'input',
		},
	},
	bio: {
		type: String,
		default: '',
		form: {
			elem: 'textarea',
		},
	},
	web_site: {
		type: String,
		default: '',
		form: {
			elem: 'input',
		},
	},
	twitter: {
		type: String,
		default: '',
		form: {
			elem: 'input',
		},
	},
	user_image: {
		type: {
			link: String,
			large_link: String,
			medium_link: String,
			small_link: String,
		}
	},
	country_code: {
		type: [{
			type: String,
			enum: regionInfo.listCountries(),
		}],
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		default: 'local',
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['author', 'admin', 'dev']
		}],
		default: ['author']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length >= 8) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
