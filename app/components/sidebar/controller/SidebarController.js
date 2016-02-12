(function() {
	'use strict';

	function SidebarController() {

		var vm = this;
		vm.mainMenuExpandState = {};

		vm.init = function(){
			var key;
			for(key in vm.mainMenus){
				vm.mainMenuExpandState[key] = false;
			}
		};

		vm.init();

		vm.mainMenus = {
			"1": {
				"id": "1",
				"type": "main_menu",
				"name": "User & Group",
				"submenus": {
					"1": {
						"id": "1",
						"type": "submenu",
						"name": "user",
						"href": "/#/user/list"
					},
					"2": {
						"id": "2",
						"type": "submenu",
						"name": "group",
						"href": "/#/group/list"
					},
					"3": {
						"id": "3",
						"type": "submenu",
						"name": "user_preference",
						"href": "/#/user-preference/list"
					}
				}
			},
			"2": {
				"id": "2",
				"type": "main_menu",
				"name": "language",
				"submenus": {
					"4": {
						"id": "1",
						"type": "submenu",
						"name": "machine_name",
						"href": "/#/machine-name/list"
					},
					"5": {
						"id": "2",
						"type": "submenu",
						"name": "machine_name_translation",
						"href": "/#/machine-name-translation/list"
					}
				}
			}
		};

		vm.toggle = function(id){
			vm.mainMenuExpandState[id] = !vm.mainMenuExpandState[id];
		};

		vm.isExpanded = function(id){
			return mainMenuExpandState[id];
		}

	}

	SidebarController.$inject = [];

	angular
		.module('_Controllers')
		.controller('SidebarController', SidebarController);
})();