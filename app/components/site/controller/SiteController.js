(function() {
	'use strict';

	function SiteController($location, $rootScope, CONFIG, AlertService, AuthenticationService, ResourceManager) {

		var vm = this;
		var uriSegment = {};

		var setUriSegment = function() {
			var segments = $location.path().split("/");
			for (var i = 1; i < segments.length; i++) {
				uriSegment[i] = segments[i];
			}
		};

		$rootScope.$on('$routeChangeStart', function() {
			setUriSegment();
		});

		vm.getUriSegment = function(number) {
			return uriSegment[number];
		};

		vm.init = function() {

			// Bind AlertService to SiteController
			vm.alert = AlertService;

			// Bind AuthenticationService to SiteController
			vm.auth = AuthenticationService;

			// Set Uri segment
			setUriSegment();
		};

		vm.init();

		vm.retrieveData = function() {
			// Retrieve all data from server
			var count = 0;
			var modelsCount = Object.keys(CONFIG.models).length;
			var type;
			for (type in CONFIG.models) {
				ResourceManager.read(type).then(function(data) {
					//console.log("get a model success.")
					count++;

					if(count==modelsCount){
						AuthenticationService.setUser();
					}
				
				}, function(errorData) {
					console.log("get a model fail.", errorData);
				});
			}
		}

		vm.getCommonsView = function(model, file) {
			return "app/resources/" + model + "/views/commons/" + file + ".html";
		};

		vm.getLoginView = function() {
			return "app/components/site/views/login.html";
		}

		vm.getAdminView = function() {
			return "app/components/site/views/admin.html";
		}

		vm.getSidebarView = function() {
			return "app/components/sidebar/views/sidebar.html";
		}

	}

	SiteController.$inject = [
		'$location',
		'$rootScope',
		'CONFIG',
		'AlertService',
		'AuthenticationService',
		'ResourceManager'
	];

	angular
		.module('_Controllers')
		.controller('SiteController', SiteController);
})();