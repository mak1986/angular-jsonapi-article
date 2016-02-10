(function() {
	'use strict';

	function SiteController($rootScope, $location, CONFIG, AlertService, AuthenticationService, ResourceManager) {

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

		this.getUriSegment = function(number) {
			return uriSegment[number];
		};

		this.init = function() {

			// Bind AlertService to SiteController
			this.alert = AlertService;

			// Bind AuthenticationService to SiteController
			this.auth = AuthenticationService;

			// Set Uri segment
			setUriSegment();
		};

		this.init();

		this.retrieveData = function(){
			// Retrieve all data from server
			var type;
			for (type in CONFIG.models) {
				ResourceManager.read(type).then(function(data) {
					console.log("get a model success.")
				}, function(errorData) {
					console.log("get a model fail.", errorData);
				});
			}
		}

		this.getCommonsTemplate = function(model, file) {
			return "app/resources/" + model + "/views/commons/" + file + ".html";
		};

		this.getLoginTemplate = function() {
			return "app/components/site/views/login.html";
		}

		this.getAdminTemplate = function() {
			return "app/components/site/views/admin.html";
		}

	}

	SiteController.$inject = [
		'$rootScope',
		'$location',
		'CONFIG',
		'AlertService',
		'AuthenticationService',
		'ResourceManager'
	];

	angular
		.module('Controllers')
		.controller('SiteController', SiteController);
})();