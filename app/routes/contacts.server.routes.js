'use strict';

var contacts = require('../../app/controllers/contacts');

module.exports = function(app) {
	app.route('/contacts')
		.get(contacts.list)
		.post(contacts.create);

	app.route('/contacts/:contactId')
	 	.get(contacts.read)
	 	.put(contacts.update)
	 	.delete(contacts.delete);

	app.param('contactId', contacts.contactByID);
};