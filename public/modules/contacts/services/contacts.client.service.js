'use strict';

angular.module('contacts').factory('Contacts', ['$resource',
	function($resource) {
		return $resource('contacts/:contactId', {
			contactId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);