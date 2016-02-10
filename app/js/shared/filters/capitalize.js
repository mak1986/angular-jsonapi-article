(function() {
  'use strict';
 	var capitalize = function() {
		return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    	}
	};
	angular.module('Filters')
	.filter('capitalize', capitalize);

})();