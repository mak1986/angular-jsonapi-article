(function() {
	'use strict';

	function ResourceManager(converter, rest) {
		this.converter = converter;
		this.rest = rest;
	}

	function ResourceManagerProvider() {
		var converter, rest;

		this.setConverter = function(converterService) {
			converter = converterService;
		};
		this.setRest = function(restService) {
			rest = restService;
		};

		var Manager = function($injector) {
			return new ResourceManager($injector.get(converter), $injector.get(rest));
		};

		this.$get = ['$injector', Manager]; 
	}



	angular
		.module('Manager')
		.provider('ResourceManager', ResourceManagerProvider);

})();