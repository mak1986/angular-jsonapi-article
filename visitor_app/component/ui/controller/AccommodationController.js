(function() {
	'use strict';

	function AccommodationController($routeParams, CONFIG, ResourceManager, UserInterface) {

		var vm = this;
		
		vm.getAccommodation = function(){
			vm.accommodation = ResourceManager.readFromStorage('accommodation')[$routeParams.id];
		};
	}

	AccommodationController.$inject = [
		'$routeParams',
		'CONFIG',
		'ResourceManager'
	];

	angular
		.module('_Controllers')
		.controller('AccommodationController', AccommodationController);
})();