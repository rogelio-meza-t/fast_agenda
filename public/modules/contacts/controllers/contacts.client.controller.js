'use strict';

angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'Contacts',
	function($scope, $stateParams, $location, Contacts) {
		
		$scope.langs = [{'code': 'en', 'name': 'English'},{'code': 'es', 'name': 'Spanish'}];
		$scope.lang_model = $scope.langs[0];

		$scope.create = function() {
			var contact = new Contacts({
				name: this.name,
				company: this.company,
				lang: this.lang_model
			});
			contact.$save(function(response) {
				$location.path('contacts/' + response._id);

				$scope.name = '';
				$scope.email = '';
				$scope.company = '';
				$scope.lang = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(contact) {
			if (contact) {
				contact.$remove();

				for (var i in $scope.contacts) {
					if ($scope.contacts[i] === contact) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {
					$location.path('contacts');
				});
			}
		};

		$scope.update = function() {
			var contact = $scope.contact;

			contact.$update(function() {
				$location.path('contacts/' + contact._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.contacts = Contacts.query();
		};

		$scope.findOne = function() {
			$scope.contact = Contacts.get({
				contactId: $stateParams.contactId
			});
		};
	}
]);