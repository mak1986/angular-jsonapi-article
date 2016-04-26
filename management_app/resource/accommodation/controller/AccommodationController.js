(function() {
	'use strict';

	function AccommodationController($routeParams, $q, CONFIG, CrudUtility, ResourceManager) {

		var vm = CrudUtility.init(this, 'accommodation');
		vm.images;

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
			vm.intertImages(resource).then(function(){
				CrudUtility.store(vm, vm["type"], resource);
			});
		};

		this.update = function(resource) {
			console.log(vm.images);
			var promises = [];
			for (var id in resource.images) {
				promises.push(ResourceManager.delete(ResourceManager.readFromStorage('image')[id])
					.then(function() {
						console.log('image id:' + id + 'deleted');
					}, function(reason) {
						console.log(reason);
					}));
			}
			$q.all(promises).then(function() {
				vm.insertImages(resource).then(function(){
					CrudUtility.update(vm, vm["type"], resource);
				});
			});

		};

		this.insertImages = function(resource) {
			var index;
			var imageIds = {};
			var promises = [];

			for (index in vm.images) {
				if (vm.images[index].selected) {
					promises.push(ResourceManager.create({
							name: vm.images[index].name,
							primary: vm.images[index].primary,
							type: 'image'
						})
						.then(function(newImage) {
							imageIds[newImage.id] = true;
						}, function(reason) {
							console.log(reason);
						}));

				}
			}
			return $q.all(promises).then(function() {
				resource.images = imageIds;	
			});
		};

		this.destroy = function(resource) {
			CrudUtility.destroy(vm, vm["type"], resource);
		};

	}

	AccommodationController.$inject = [
		'$routeParams',
		'$q',
		'CONFIG',
		'CrudUtility',
		'ResourceManager'
	];

	angular
		.module('_Controllers')
		.controller('AccommodationController', AccommodationController);
})();