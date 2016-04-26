(function() {
	'use strict';

	function PaymentController($filter, $routeParams, CONFIG, CrudUtility, ResourceManager, UserInterface) {

		var vm = CrudUtility.init(this, 'payment');

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
			CrudUtility.store(vm, vm["type"], resource);
		};

		this.update = function(resource) {
			CrudUtility.update(vm, vm["type"], resource);
		};

		this.destroy = function(resource) {
			CrudUtility.destroy(vm, vm["type"], resource);
		};


		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		this.eventSources = {
			'events': null
		};
		this.filter = {
			guestName: false,
			accommodationName: true
		};
		this.calendarRefresh = true;
		// this.colors = [
		// 	'#00C0EF', //Blue
		// 	'#00A65A', //Green
		// 	'#F39C12', //Orange
		// 	'#DD4B39', //Red
		// 	'#555299', //Purple
		// 	'#001F3F', //Navy
		// 	'#CA195A', //Maroon
		// ];

		this.setEvents = function() {
			var paymentId;
			var accommodationOrders;
			var accommodationOrderId;
			var accommodationOrder;

			vm.eventSources['events'] = [];

			for (paymentId in UserInterface.site.payments) {
				accommodationOrders = $filter('hookFilterByFieldValue')(UserInterface.site.payments[paymentId].order, 'accommodationOrders');
				for (accommodationOrderId in accommodationOrders) {
					accommodationOrder = accommodationOrders[accommodationOrderId];
					var kind = $filter('hookFilterByFieldValue')(accommodationOrder.accommodation, 'kind')
					kind = $filter('hookFilterByFieldValue')(kind, 'name')[UserInterface.getLanguage()];

					var title = [];
					var label;
					
					if(vm.filter.accommodationName){
						label = $filter('hookFilterMachineNameTranslate')('ui.accommodation_name');
						label = $filter('hookFilterCapitalize')(label);
						title.push(label +': ' + $filter('hookFilterByFieldValue')(accommodationOrder.accommodation, 'name')[UserInterface.getLanguage()]);
					}
					if(vm.filter.guestName){
						label = $filter('hookFilterMachineNameTranslate')('ui.guest_name');
						label = $filter('hookFilterCapitalize')(label);
						title.push(label +': ' + UserInterface.site.payments[paymentId].first_name + ' ' + UserInterface.site.payments[paymentId].last_name);
					}

					vm.eventSources['events'].push({
						title: title.join('\n'),
						start: new Date(accommodationOrder.from),
						end: new Date(accommodationOrder.to),
						allDay: true,
						type: kind,
						url: '#/order/show/' + $filter('hookFilterByFieldValue')(UserInterface.site.payments[paymentId].order, 'id')
					});
				}
			}
			//console.log(vm.eventSources['events']);
		};

		/* config object */
		this.uiConfig = {
			calendar: {
				height: 600,
				editable: true,
				header: {
					//left: 'month basicWeek basicDay agendaWeek agendaDay',
					left: 'title',
					right: 'today prev,next'
				},
				dayClick: vm.alertEventOnClick,
				lang: UserInterface.getLanguage()
			}
		};
		/* alert on eventClick */
		this.alertOnEventClick = function(date, jsEvent, view) {
			vm.alertMessage = (date.title + ' was clicked ');
		};


		this.filterCalendar = function() {
			vm.setEvents();
			vm.calendarRefresh = ! vm.calendarRefresh;
			setTimeout(function(){
				vm.calendarRefresh = ! vm.calendarRefresh;
				console.log(vm.calendarRefresh);
			}, 5);
			
		};
	}

	PaymentController.$inject = [
		'$filter',
		'$routeParams',
		'CONFIG',
		'CrudUtility',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Controllers')
		.controller('PaymentController', PaymentController);
})();