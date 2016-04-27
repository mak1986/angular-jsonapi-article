(function() {
  'use strict';

  	// Don't use inBlackListFilter !! UserInterface setup is depended on this filter. 
 	var hookFilterByFirstRelationship = function($filter) {

		return function(input) {
			if(input){
				return input[Object.keys(input)[0]];
			}
			return input;
    	}
	};

	hookFilterByFirstRelationship.$inject = [
		'$filter'
	];

	angular.module('_Filter')
	.filter('hookFilterByFirstRelationship', hookFilterByFirstRelationship);

})();