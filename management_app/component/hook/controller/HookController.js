(function() {
	'use strict';

	function HookController($location, $rootScope, CONFIG, Alert, Authentication, ResourceManager, UserInterface) {

		var vm = this;
		// var uriSegment = {};

		// var setUriSegment = function() {
		// 	var segments = $location.path().split("/");
		// 	for (var i = 1; i < segments.length; i++) {
		// 		uriSegment[i] = segments[i];
		// 	}
		// };

		// $rootScope.$on('$routeChangeStart', function() {
		// 	setUriSegment();
		// });

		// vm.getUriSegment = function(number) {
		// 	return uriSegment[number];
		// };

		vm.init = function() {

			// Bind Alert to HookController
			vm.alert = Alert;

			// Bind Authentication to HookController
			vm.auth = Authentication;

			// Bind UserInterface to HookController
			vm.ui = UserInterface;

			// Set Uri segment
			//setUriSegment();

		};

		vm.init();
		

		vm.getCommonView = function(model, file) {
			return "management_app/resource/" + model + "/view/common/" + file + ".html";
		};

		vm.getLoginView = function() {
			return "management_app/component/hook/view/login.html";
		};

		vm.getAdminView = function() {
			return "management_app/component/hook/view/admin.html";
		};

		vm.getAlertView = function() {
			return "management_app/component/hook/view/alert.html";
		};
		
		vm.getSidebarView = function() {
			return "management_app/component/sidebar/view/sidebar.html";
		};

		vm.getSectionView = function(file){
			return "shared/section/" + file + '.html';
		};
		vm.test = function(){
			return "test";
		}
	}

	HookController.$inject = [
		'$location',
		'$rootScope',
		'CONFIG',
		'Alert',
		'Authentication',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('HookController', HookController);
})();