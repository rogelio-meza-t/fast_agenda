'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ContactSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	email: {
		type: String,
		trim: true,
		default: '',
		required: 'Email cannot be blank',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	company: {
		type: String,
		default: '',
		trim: true
	},
	lang: {
		type: {}
	}
});

mongoose.model('Contact', ContactSchema);