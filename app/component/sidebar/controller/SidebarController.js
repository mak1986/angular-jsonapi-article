(function() {
	'use strict';

	function SidebarController(Authentication, ResourceManager,UserInterface) {

		var vm = this;
		vm.mainMenuExpandState = {};
		vm.adminMainMenus = ResourceManager.readFromStorage('admin_main_menu');
		
		vm.init = function(){
			var key;
			for(key in vm.adminMainMenus){
				vm.mainMenuExpandState[key] = false;
			}
		};

		vm.init();

		vm.toggle = function(id){
			vm.mainMenuExpandState[id] = !vm.mainMenuExpandState[id];
		};

		vm.isExpanded = function(id){
			return mainMenuExpandState[id];
		}
		vm.test = function(){
			console.log('test');
		}
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