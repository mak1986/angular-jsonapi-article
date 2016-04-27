(function() {
	'use strict';

	function UiController($location, $rootScope, $routeParams, CONFIG, Cart, ResourceManager, UserInterface) {

		var vm = this;
		vm.ui = UserInterface;
		vm.cart = Cart;

		// vm.getAccommodationImages = function() {
		// 	return [
		//       	{id:0,image:'http://localhost:3000/images/1/accommodation_1.jpg'},
		//       	{id:1,image:'http://s7d9.scene7.com/is/image/kohlerhospitality/aab19077_938?$1024x480$',text:'bla 2'},
		//       	{id:2,image:'http://www.westcordhotels.nl/wp-content/uploads/2016/01/xvirtual-tour-large-double-room-tuin-fashion-hotel-amsterdam-1024x480.jpg.pagespeed.ic.1ik8bK9EWS.jpg',text:'bla 3'}
		//       	];
		// };

		vm.getDate = function(){
			return new Date();
		};

		vm.getAccommodationImages = function(accommodation) {
			var images = [];
			var image;
			var id;
			var count = 0;
			for(id in accommodation.images){
				image = {
					id: id,
					image: 'http://localhost:3000/images/' + UserInterface.site.id + '/' + accommodation.images[id].name
				}; 
				if(accommodation.images[id].primary){
					images.unshift(image);
				}else{
					images.push(image);
				}
			}

			return images;
		};
		vm.getAccommodationPrimaryImage = function(accommodation){
			var id;
			for(id in accommodation.images){
				if(accommodation.images[id].primary){
					return accommodation.images[id];
				}
			}
		};
		vm.getSections = function() {
			if ($routeParams.page) {
				for (var id in vm.ui.site.pages) {
					if ($routeParams.page == vm.ui.site.pages[id].name) {
						return vm.ui.site.pages[id].sections;
					}
				}
			}
		};

		vm.getRouteParam = function(key) {
			return $routeParams[key];
		};

		vm.getSectionView = function(file) {
			return '/shared/section/' + file + '.html';
		};

		vm.getComponentView = function(component, file) {
			return '/visitor_app/component/' + component + '/view/' + file + '.html';
		};
		vm.getComponentImage = function(component, file, ext) {
			return '/visitor_app/component/' + component + '/img/' + file + '.' + ext;
		};
		vm.mainMenuHasHome = function() {
			var id;

			for (id in vm.ui.site.pages) {
				if (vm.ui.site.pages[id].name == 'home') {
					return true;
				}
			}

			return false;
		};
	}

	UiController.$inject = [
		'$location',
		'$rootScope',
		'$routeParams',
		'CONFIG',
		'Cart',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('UiController', UiController);
})();