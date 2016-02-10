(function() {
	'use strict';

	function UserController(CONFIG, CrudUtility, $routeParams, ResourceManager) {

		var vm = CrudUtility.init(this, 'user');

		this.list = function() {
			CrudUtility.list(vm, vm["type"]);
		};

		this.show = function() {
			CrudUtility.show(vm, vm["type"]);
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

	UserController.$inject = [
		'CONFIG',
		'CrudUtility',
		'$routeParams',
		'ResourceManager'
	];

	angular
		.module('Controllers')
		.controller('UserController', UserController);
})();