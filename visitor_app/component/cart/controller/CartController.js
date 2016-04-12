(function() {
	'use strict';

	function CartController(Cart) {

		var vm = this;

		vm.getItems = function(type){
			console.log(Cart.getItems(type));
			return Cart.getItems(type);
		};

		vm.getTotalPrice = function(type){
			return Cart.getTotalPrice(type);
		};

		vm.delete = function(item, type){
			Cart.delete(item, type);
		};
	}

	CartController.$inject = [
		'Cart'
	];

	angular
		.module('_Controllers')
		.controller('CartController', CartController);
})();