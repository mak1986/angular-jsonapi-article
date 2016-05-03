(function() {
	'use strict';

	function SidebarController($filter, Authentication, ResourceManager, UserInterface) {

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

		vm.getMenu = function() {

			if (UserInterface.site == null) {
				UserInterface.features = getGroup('group.super_admin').features;
				return UserInterface.features
			}

			if (UserInterface.featureMode == 'full') {
				UserInterface.features = getGroup('group.admin').features;
				return UserInterface.features
			}

			// remember to implement intersection of groups and site's plan
			if(UserInterface.featureMode == 'plan') {
				UserInterface.features = $filter('hookFilterByFieldValue')(UserInterface.site.plan, 'features');
				return UserInterface.features;
			}

		};
		vm.getFirstHref = function(feature){
			for(var id in feature.backendRoutes){
				if(feature.backendRoutes[id].is_menu){
					return feature.backendRoutes[id].route;
				}
			}
			return null;
		};

		var getGroup = function(machineName) {
			var groups = ResourceManager.readFromStorage('group');
			var i;
			for (i in groups) {
				if ($filter('hookFilterByFieldValue')(groups[i].machineName, 'name') == machineName) {
					return groups[i];
				}
			}
		};

	}

	SidebarController.$inject = [
		'$filter',
		'Authentication',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('SidebarController', SidebarController);
})();