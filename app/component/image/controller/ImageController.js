(function() {
	'use strict';

	function ImageController($http, $mdDialog, $mdMedia, ResourceManager, UserInterface) {

		var vm = this;
		vm.imageCount = 0;
		vm.dialogImages = [];
		vm.images = [];
		vm.primaryImage = null;

		$http.get('http://localhost:3000/count-images', {
			params: {
				id: UserInterface.site.id
			}
		}).then(
			function(res) {
				vm.imageCount = res.data;
				vm.init();
			}
		);

		vm.init = function() {

			var count = 1;
			var col = 3;

			for (var index = 0; index < Math.ceil(vm.imageCount / col); index++) {

				vm.dialogImages.push([]);

				for (count; count <= (index + 1) * col; count++) {

					var image = {
						name: 'accommodation_' + count + '.jpg',
						src: 'http://localhost:3000/images/' + UserInterface.site.id + '/accommodation_' + count + '.jpg',
						selected: false,
						primary: false,
					};
					vm.images.push(image);
					vm.dialogImages[index].push(image);

					if (count >= vm.imageCount) {
						break;
					}
				}

			}
			
			var id;
			
			for(id in vm.originalImages){
				updateImage(vm.originalImages[id]);
			}

		};

		var updateImage = function(originalImage){
			var index;
			for(index in vm.images){
				if(vm.images[index].name == originalImage.name){
					vm.images[index].selected = true,
					vm.images[index].primary = originalImage.primary
				}
				if(vm.images[index].primary){
					vm.primaryImage = vm.images[index];
				}
			}
		};
		
		vm.setImages = function(images){
			var id;
			vm.originalImages = {};
			
			for(id in images){
				vm.originalImages[id] = ResourceManager.readFromStorage('image')[id]
			}
			//console.log(vm.originalImages);

		};

		vm.showImagePicker = function(event) {

			var parentElement = angular.element(document.querySelector('body'));
			var useFullScreen = $mdMedia('xs') || $mdMedia('sm');
			$mdDialog.show({
				parent: parentElement,
				targetEvent: event,
				templateUrl: 'app/component/image/view/dialog/image_picker.html',
				clickOutsideToClose: true,
				fullscreen: useFullScreen,
				controller: function ImageDialogController() {

					//this.sectionKinds = ResourceManager.readFromStorage('section_kind');
					var dialogVm = this;
					dialogVm.images = vm.dialogImages;

					dialogVm.select = function(image) {
						image.selected = true;
					}
					dialogVm.deselect = function(image) {
						image.selected = false;
						if (image.primary) {
							dialogVm.removeFromPrimary(image);
						}
					}
					dialogVm.removeFromPrimary = function(image) {
						image.primary = false;
						vm.primaryImage = null;
					};
					dialogVm.makePrimary = function(image) {
						var index;
						for (index in vm.images) {
							vm.images[index].primary = false;
						}
						image.primary = true;
						vm.primaryImage = image;
					};
					dialogVm.close = function() {
						$mdDialog.hide();
					};


				},
				controllerAs: 'ImageDialogController'
			});


		};

	}

	ImageController.$inject = [
		'$http',
		'$mdDialog',
		'$mdMedia',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('ImageController', ImageController);
})();