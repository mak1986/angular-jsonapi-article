(function() {
	'use strict';

	function AccommodationBookingDetailController($filter) {

		var vm = this;
		vm.accommodationOrders = null;

		vm.getDuration = function(from, to){
			return $filter('amDifference')(to, from, 'days');
		};

		vm.getLinePrice = function(accommodationOrder){
			var duration = vm.getDuration(accommodationOrder.from, accommodationOrder.to);
			return $filter('hookFilterByFieldValue')(accommodationOrder.accommodation, 'price') * duration;
		};

		vm.getTotalPrice = function(){
			var total = 0;
			var id;

			for(id in vm.accommodationOrders){
				total += vm.getLinePrice(vm.accommodationOrders[id]);
			}

			return total;
		};

	}

	AccommodationBookingDetailController.$inject = [
		'$filter'
	];

	angular
		.module('_Controllers')
		.controller('AccommodationBookingDetailController', AccommodationBookingDetailController);
})();