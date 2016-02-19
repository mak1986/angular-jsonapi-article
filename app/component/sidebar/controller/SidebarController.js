(function() {
	'use strict';

	function SidebarController(Authentication, ResourceManager, UserInterface) {

		var vm = this;
		var currentRoute;

		vm.mainMenuExpandState = {};
		vm.activeMainMenuId = undefined;
		vm.activeSubmenuId = undefined;
		vm.features = ResourceManager.readFromStorage('feature');

		vm.init = function() {
			var key;
			for (key in vm.features) {
				vm.mainMenuExpandState[key] = false;
			}
		};

		vm.init();

		vm.selectMainMenu = function(mainMenuId) {
			if (vm.submenuCount(vm.features[mainMenuId].backendRoutes) == 1) {
				vm.activeSubmenuId = undefined;
				vm.activeMainMenuId = mainMenuId;
			}			
			vm.mainMenuExpandState[mainMenuId] = !vm.mainMenuExpandState[mainMenuId];
		};

		vm.selectSubmenu = function(submenuId, mainMenuId) {
			vm.activeSubmenuId = submenuId;
			vm.activeMainMenuId = mainMenuId;
		};

		vm.isExpanded = function(id) {
			return mainMenuExpandState[id];
		};

		vm.submenuCount = function(routes) {
			var id;
			var count = 0;
			for (id in routes) {
				if (routes[id].is_menu) {
					count++;
				}
			}
			return count;
		};

	}

	SidebarController.$inject = [
		'Authentication',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('SidebarController', SidebarController);
})();