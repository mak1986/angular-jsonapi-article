(function() {
	'use strict';

	function AccommodationBookingController($filter, Cart) {

		var vm = this;
		vm.accommodation = null;
		vm.from = null;
		vm.to = null;

		vm.book = function(){
			var accommodation = vm.accommodation;
			Cart.add({
				'accommodation': accommodation,
				'from': vm.from,
				'to': vm.to,
				'formatName': function(){
						return $filter('hookFilterContentTranslate')(accommodation.name) || accommodation.room_type;
					},
				'getPrice': function(){
						return accommodation.price;
					},
				'duration': 2
				},'accommodation');
		};

	}

	AccommodationBookingController.$inject = [
		'$filter',
		'Cart'
	];

	angular
		.module('_Controllers')
		.controller('AccommodationBookingController', AccommodationBookingController);
})();