(function() {
  'use strict';
 	var fieldValue = function() {
		return function(input, attr) {
			for(var i in input){
				return input[i][attr];
			}
    	}
	};
	angular.module('Filters')
	.filter('fieldValue', fieldValue);

})();