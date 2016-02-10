(function() {
	'use strict';

	function AuthenticationService(ResourceManager) {

		this.isLoggedIn = true;

		this.login = function(login){
			if(login.username=="admin" && login.password == "1234"){
				this.isLoggedIn = true;
				console.log(this.isLoggedIn);
			}
		}

		this.logout = function(){
			this.isLoggedIn = false;
		}
		
	}

	AuthenticationService.$inject = [
		'ResourceManager'
	];

	angular
		.module('_Authentication')
		.service('AuthenticationService', AuthenticationService);
})();