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
				if (resources.length == 0) {
					console.log("wrong login");
				} else if (resources.length == 1) {
					console.log("login succes");
					userId = resources[0].id;
					service.retrieveData();
				}

			}, function(reason) {

				console.log("something went wrong");

			});
		};

		service.logout = function() {
			$window.location.reload();
		};
		
		service.setup = function(){
			//set user
			service.user = ResourceManager.readFromStorage('user')[userId];
			UserInterface.setUser(service.user);

			//set default site
			if(!service.hasGroup('group.super_admin')){
				var site = service.user.sites[Object.keys(service.user.sites)[0]];
				UserInterface.setSite(site);
				$location.path("/accommodation/list");
			}else{
				$location.path("/site/list");
			}
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
						service.isLoggedIn = true;
						service.setup();
					}
				
				}, function(errorData) {
					console.log("get a model fail.", errorData);
				});
			}
		};

		service.hasGroup = function(machineName){
			var id;

			for(id in service.user.groups){
				if($filter('hookFilterByFieldValue')(service.user.groups[id].machineName, 'name') == machineName){
					return true;
				}
			}

			return false;
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