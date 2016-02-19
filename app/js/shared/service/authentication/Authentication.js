(function() {
	'use strict';

	function Authentication($filter, $location, $rootScope, $window, CONFIG, ResourceManager, UserInterface) {

		var service = this;
		// uncomment for real login
		// var userId;
		// service.isLoggedIn = false;
		


		service.login = function(login) {
			var where = {};

			ResourceManager.readWhere("user", login).then(function(resources) {
				//console.log(resources);
				if (resources.length == 0) {
					//console.log("wrong login");
				} else if (resources.length == 1) {
					//console.log("login succes");
					userId = resources[0].id;
					service.retrieveData();
				}

			}, function(reason) {

				console.log("something went wrong");

			});

			// if (login.username == "admin" && login.password == "1234") {
			// 	service.isLoggedIn = true;
			// 	UserInterface.setLanguage('th');
			// }
		};

		service.logout = function() {
			$window.location.reload();
		};

		service.setUser = function() {
			service.user = ResourceManager.readFromStorage('user')[userId];
			UserInterface.setUser(service.user);
		};

		service.retrieveData = function() {
			// Retrieve all data from server
			var count = 0;
			var modelsCount = Object.keys(CONFIG.models).length;
			var type;
			for (type in CONFIG.models) {
				ResourceManager.read(type).then(function(data) {
					//console.log("get a model success.")
					count++;

					if(count==modelsCount){
						service.setUser();
						service.isLoggedIn = true;
						$location.path("/site/list");
					}
				
				}, function(errorData) {
					console.log("get a model fail.", errorData);
				});
			}
		};


		//comment for real login
		var userId = 1;
		service.isLiggedIn = true;
		service.retrieveData();
	}

	Authentication.$inject = [
		'$filter',
		'$location',
		'$rootScope',
		'$window',
		'CONFIG',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Authentication')
		.service('Authentication', Authentication);
})();