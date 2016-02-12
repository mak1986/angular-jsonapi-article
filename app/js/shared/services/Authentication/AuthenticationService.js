(function() {
	'use strict';

	function AuthenticationService($rootScope, ResourceManager, UiService) {

		var service = this;
		service.isLoggedIn = false;

		service.login = function(login){
			if(login.username=="admin" && login.password == "1234"){
				service.isLoggedIn = true;
				UiService.setLanguage('th');
			}
		}

		service.logout = function(){
			service.isLoggedIn = false;
		}

		service.setUser = function(){
			service.user = ResourceManager.readFromStorage('user')["1"];
		}
		
	}

	AuthenticationService.$inject = [
		'$rootScope',
		'ResourceManager',
		'UiService'
	];

	angular
		.module('_Authentication')
		.service('AuthenticationService', AuthenticationService);
})();