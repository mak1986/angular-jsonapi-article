(function() {
	'use strict';

	function AccommodationBookingFormController($filter, ResourceManager, UserInterface) {

		var vm = this;
		vm.accommodation = null;
		vm.from = null;
		vm.to = null;
		vm.extra_bed_quantity = null;
		vm.loading = false;

		// vm.book = function(){
		// 	var accommodation = vm.accommodation;
		// 	Cart.add({
		// 		'accommodation': accommodation,
		// 		'from': vm.from,
		// 		'to': vm.to,
		// 		'formatName': function(){
		// 				return $filter('hookFilterContentTranslate')(accommodation.name) || accommodation.room_type;
		// 			},
		// 		'getPrice': function(){
		// 				return accommodation.price;
		// 			},
		// 		'duration': 2
		// 		},'accommodation');
		// };

		vm.book = function() {

			vm.loading = true;

			if (!isBooking()) {

				createOrder(createAccommodationOrder);

			} else {
				
				var orders = ResourceManager.readFromStorage('order');
				var order = orders[Object.keys(orders)[0]];
				
				createAccommodationOrder();

			}


		};

		var createOrder = function(callBackSuccess, callBackError) {
			var order = {
				'type': 'order',
				'paid': false,
				'site': {}
			};
			order['site'][UserInterface.site.id] = UserInterface.site;

			ResourceManager.create(order)
			.then(function(newResource) {

				UserInterface.setOrder(newResource);

				callBackSuccess();

			}, function(reason) {

				callBackError();

			});
		};

		var createAccommodationOrder = function(callBackSuccess, callBackError){
			var accommodationOrder = {
				'type': 'accommodation__order',
				'from': vm.from,
				'to': vm.to,
				'extra_bed_quantity': vm.extra_bed_quantity,
				'accommodation': {},
				'order': {}
			};
			accommodationOrder['accommodation'][vm.accommodation.id] = vm.accommodation;
			accommodationOrder['order'][UserInterface.getOrder().id] = UserInterface.getOrder();


			ResourceManager.create(accommodationOrder)
			.then(function(newResource) {

				vm.loading = false;
				//callBackSuccess();

			}, function(reason) {

				//callBackError();

			});
		};

		var isBooking = function() {
			if(UserInterface.getOrder() == null){
				return false;
			}

			return true;

		};

	}

	AccommodationBookingFormController.$inject = [
		'$filter',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('AccommodationBookingFormController', AccommodationBookingFormController);
})();