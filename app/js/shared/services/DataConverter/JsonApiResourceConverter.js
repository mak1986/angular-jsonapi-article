(function() {
	'use strict';

	function JsonApiResourceConverter() {
		this.hallo = function(){
			return 'hallo';
		};
	}

	angular
		.module('DataConverter')
		.service('JsonApiResourceConverter', JsonApiResourceConverter);
})();