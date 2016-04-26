(function() {
	'use strict';

	function SectionController($mdDialog, $mdMedia, $routeParams, CONFIG, CrudUtility, ResourceManager) {

		var vm = CrudUtility.init(this, 'section');
		vm['mode'] = {};
		vm['language'] = {};
		vm['new_sections'] = {};
		vm['current_page'] = null;

		this.list = function() {
			CrudUtility.list(vm, vm["type"]);
		};

		this.show = function() {
			CrudUtility.show(vm, vm["type"]);
		};

		this.form = function(resource) {
			if (resource) {
				vm['copies'][resource.id] = ResourceManager.shallowCopy(resource);
			} else {

			}
		};

		this.store = function(resource) {
			delete resource['id'];
			resource = this.normalizeResource(resource);
			CrudUtility.store(vm, vm["type"], resource, true);
		};

		this.update = function(resource) {
			resource = this.normalizeResource(resource);
			CrudUtility.update(vm, vm["type"], resource, true);
			this.setMode(resource, 'show');
		};

		this.normalizeResource = function(resource){
			var id = resource.kind[Object.keys(resource.kind)[0]]['id'];
			resource.kind = {};
			resource.kind['id'] = id;
			return resource;
		};

		this.destroy = function(resource) {
			CrudUtility.destroy(vm, vm["type"], resource);
		};

		this.makeCopy = function(resource) {
			console.log('copy',resource);
			var copiedResource;
			if (resource) {
				copiedResource = ResourceManager.shallowCopy(resource);
				copiedResource.kind = resource.kind;
				console.log('after', copiedResource);
				return copiedResource;
			}
		};

		this.isNew = function(section){
			return isNaN(section.id);
		};

		this.setMode = function(resource, mode) {
			vm.mode[resource.id] = mode;
		};

		this.getMode = function(resource) {
			return vm.mode[resource.id];
		};
		
		this.setCurrentPage = function(page){
			vm['current_page'] = page;
		};

		this.setLanguage = function(resource, language) {
			vm.language[resource.id] = language;
		};

		this.getLanguage = function(resource) {
			return vm.language[resource.id];
		}



		this.showAlert = function(event) {
			var parentElement = angular.element(document.querySelector('body'));
			var useFullScreen = $mdMedia('xs') || $mdMedia('sm');
			$mdDialog.show({
				parent: parentElement,
				targetEvent: event,
				templateUrl: 'management_app/resource/section/view/dialog/section_kind.html',
				clickOutsideToClose: true,
				fullscreen: useFullScreen,
				controller: function SectionKindDialogController() {

					this.sectionKinds = ResourceManager.readFromStorage('section_kind');
					
					this.close = function() {
						$mdDialog.hide();
					};
					
					this.addSection = function(kind) {
						var count = Object.keys(vm['new_sections']).length;
						vm['new_sections']['new_' + (count + 1)] = {
							'id': 'new_' + (count + 1),
							'type': 'section',
							'title': {},
							'body': {},
							'kind': {},
							'page': {}
						};
						vm['new_sections']['new_'+(count+1)]['kind'][kind.id] = kind;
						vm['new_sections']['new_'+(count+1)]['page']['id'] = vm['current_page'].id;
						this.close();
						console.log(vm['new_sections']);
						console.log(vm['mode']);
						console.log(vm['lannguage']);
					}
				
				},
				controllerAs: 'SectionKindDialogController'
			});
		};
	}

	SectionController.$inject = [
		'$mdDialog',
		'$mdMedia',
		'$routeParams',
		'CONFIG',
		'CrudUtility',
		'ResourceManager'
	];

	angular
		.module('_Controllers')
		.controller('SectionController', SectionController);
})();