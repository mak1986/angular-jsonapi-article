(function() {
	'use strict';

	function AuthenticationService($rootScope, ResourceManager) {

		$rootScope.$on('SiteControllerRetrieveData', function(){
			service.user = ResourceManager.readFromStorage('user')["1"];
		});

		var service = this;
		service.isLoggedIn = false;

		service.login = function(login){
			if(login.username=="admin" && login.password == "1234"){
				service.isLoggedIn = true;
				
			}
		}

		service.logout = function(){
			service.isLoggedIn = false;
		}
		
	}

	AuthenticationService.$inject = [
		'$rootScope',
		'ResourceManager'
	];

	angular
		.module('_Authentication')
		.service('AuthenticationService', AuthenticationService);
})();