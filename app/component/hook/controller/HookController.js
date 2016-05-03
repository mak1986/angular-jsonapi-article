(function() {
	'use strict';

	function HookController($location, $rootScope, CONFIG, Alert, Authentication, ResourceManager, UserInterface) {

		var vm = this;

		vm.init = function() {

			// Bind Alert to HookController
			vm.alert = Alert;

			// Bind Authentication to HookController
			vm.auth = Authentication;

			// Bind UserInterface to HookController
			vm.ui = UserInterface;

		};

		vm.init();
		

		vm.getCommonView = function(model, file) {
			return "app/resource/" + model + "/view/common/" + file + ".html";
		};

		vm.getLoginView = function() {
			return "app/component/hook/view/login.html";
		};

		vm.getAdminView = function() {
			return "app/component/hook/view/admin.html";
		};

		vm.getAlertView = function() {
			return "app/component/hook/view/alert.html";
		};
		
		vm.getSidebarView = function() {
			return "app/component/sidebar/view/sidebar.html";
		};

		vm.getSectionView = function(file){
			return "shared/section/" + file + '.html';
		};
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