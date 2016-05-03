(function() {
	'use strict';

	function PageController($routeParams, CONFIG, CrudUtility, ResourceManager, UserInterface) {

		var vm = CrudUtility.init(this, 'page');
		console.log(vm.pages);
		this.list = function() {
			CrudUtility.list(vm, vm["type"]);
		};

		this.show = function() {
			CrudUtility.show(vm, vm["type"]);
		};

		this.form = function() {
			CrudUtility.form(vm, vm["type"]);
		};

		this.store = function(resource) {
			resource.site = UserInterface.site.id;
			CrudUtility.store(vm, vm["type"], resource);
		};

		this.update = function(resource) {
			CrudUtility.update(vm, vm["type"], resource);
		};
		
		this.destroy = function(resource) {
			CrudUtility.destroy(vm, vm["type"], resource);
		};

	}

	PageController.$inject = [
		'$routeParams',
		'CONFIG',
		'CrudUtility',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('PageController', PageController);
})();