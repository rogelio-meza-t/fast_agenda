'use strict';
angular.module('contacts').run(['Menus',
	function(Menus) {
		Menus.addMenu('topbar', true);
		Menus.addMenuItem('topbar', 'Contacts', 'contacts', 'dropdown', '/contacts(/create)?', 'hola');
		Menus.addSubMenuItem('topbar', 'contacts', 'List Contacts', 'contacts', 'contacts', 'hola');
		Menus.addSubMenuItem('topbar', 'contacts', 'New Contact', 'contacts/create');
	}
]);