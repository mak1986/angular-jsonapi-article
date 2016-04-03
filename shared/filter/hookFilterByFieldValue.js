(function() {
  'use strict';

  	// Don't use inBlackListFilter !! UserInterface setup is depended on this filter. 
 	var hookFilterByFieldValue = function($filter) {

		return function(input, attr) {
			if(input){
				return input[Object.keys(input)[0]][attr];
			}
			return input;
    	}
	};

	hookFilterByFieldValue.$inject = [
		'$filter'
	];

	angular.module('_Filter')
	.filter('hookFilterByFieldValue', hookFilterByFieldValue);

})();