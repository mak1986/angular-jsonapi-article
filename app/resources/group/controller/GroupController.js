(function() {
	'use strict';

	function GroupController(CONFIG, CrudUtility, $routeParams, ResourceManager) {
		//console.log("groupController called");
		var vm = CrudUtility.init(this, 'group');

		this.list = function() {
			console.log("in group controller list");
			CrudUtility.list(vm, vm["type"]);
		};

		this.show = function() {
			CrudUtility.show(vm, vm["type"]);
			//console.log(ResourceManager.readFromStorage('group'));
			//console.log(ResourceManager.readFromStorage('user'));
		};

		this.form = function(){
			CrudUtility.form(vm, vm["type"]);
		};

		this.store = function(resource) {
			CrudUtility.store(vm, vm["type"], resource);
		};

		this.update = function(resource) {
			CrudUtility.update(vm, vm["type"], resource);
		};
		
		this.destroy = function(resource) {
			CrudUtility.destroy(vm, vm["type"], resource);
		};

	}

	GroupController.$inject = [
		'CONFIG',
		'CrudUtility',
		'$routeParams',
		'ResourceManager'
	];

	angular
		.module('Controllers')
		.controller('GroupController', GroupController);
})();