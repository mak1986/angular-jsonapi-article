(function() {
	'use strict';

	function Cart($filter, $route, CONFIG, ResourceManager) {

		var service = this;
		service.items = {};

		service.add = function(item, type){
			if(!service.items[type]){
				service.items[type] = [];
				// createOrder();
			}
			service.items[type].push(item);
			console.log(service.items);
		};
		
		service.getItems = function(type){
			if(service.items[type]){
				return service.items[type];
			}
			return null;
		};

		service.getTotalPrice = function(type){
			var total = 0;
			if(service.items[type]){
				for(var i in service.items[type]){
					total += service.items[type][i].duration * service.items[type][i].getPrice();
				}
			}
			return total;
		};
		
		service.count = function(){
			var length = 0;
			for(var type in service.items){
				length =+service.items[type].length;
			}
			return length
		};

		service.delete = function(item, type){
			for(var i in service.items[type]){
				if(service.items[type][i] === item){
					service.items[type].splice(i, 1);
					break;
				}
			}
			console.log('in delete',service.items)
		};

		// var createOrder = function(){
		// 	ResourceManager.create(resource)
		// 		.then(function(newResource) {

		// 			if (stayOnPage) {
		// 				Alert.setSuccessMessage('model.' + type, "ui.stored", false);
		// 				$location.path();
		// 			} else {
		// 				Alert.setSuccessMessage('model.' + type, "ui.stored", true);
		// 				$location.path('/' + vm["type_dash"] + '/show/' + newResource.id);
		// 			}

		// 		}, function(reason) {
		// 			Alert.setErrorMessage(false);
		// 			$location.path();

		// 		});
		// }
	}

	Cart.$inject = [
		'$filter',
		'$route',
		'CONFIG',
		'ResourceManager'
	];

	angular
		.module('_Cart')
		.service('Cart', Cart);
})();