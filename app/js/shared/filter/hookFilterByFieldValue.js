(function() {
  'use strict';

  	// Don't use inBlackListFilter !! UserInterface setup is depended on this filter. 
 	var hookFilterByFieldValue = function($filter) {

		return function(input, attr) {

			for(var i in input){
				return input[i][attr];
			}
    	}
	};

	hookFilterByFieldValue.$inject = [
		'$filter'
	];

	angular.module('_Filter')
	.filter('hookFilterByFieldValue', hookFilterByFieldValue);

})();