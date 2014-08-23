'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Contact = mongoose.model('Contact'),
	_ = require('lodash');


exports.create = function(req, res) {

	Contact.findOne({
		email : req.body.email
	}, function(err, contact){
		if(contact){
			return res.status(400).send({
				message: 'Email already exists'
			});
		}
		else{
			var new_contact = new Contact(req.body);
			new_contact.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(new_contact);
				}
			});
		}
	});
};

exports.list = function(req, res) {
	Contact.find().sort('-created').populate('contact').exec(function(err, contacts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contacts);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.contact);
};

exports.update = function(req, res) {

	Contact.findOne({
		_id : req.body._id
	}, function(err, contact){
		if(contact.email !== req.body.email){
			return res.status(400).send({
				message: 'Cannot modify the email'
			});
		}
		else{
			var new_contact = req.contact;
			new_contact = _.extend(new_contact, req.body);
			new_contact.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(new_contact);
				}
			});
		}
	});
	
};

exports.delete = function(req, res) {
	var contact = req.contact;

	contact.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contact);
		}
	});
};

exports.contactByID = function(req, res, next, id) {
	Contact.findById(id).populate('contact').exec(function(err, contact) {
		if (err) return next(err);
		if (!contact) return next(new Error('Failed to load contact ' + id));
		req.contact = contact;
		next();
	});
};