(function() {
  'use strict';

  	// Don't use inBlackListFilter !! UserInterface setup is depended on this filter. 
 	var hookFilterFieldValue = function($filter) {

		return function(input, attr) {

			for(var i in input){
				return input[i][attr];
			}
    	}
	};

	hookFilterFieldValue.$inject = [
		'$filter'
	];

	angular.module('_Filter')
	.filter('hookFilterFieldValue', hookFilterFieldValue);

})();