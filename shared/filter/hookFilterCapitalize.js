(function() {
  'use strict';
 	var hookFilterCapitalize = function($filter) {
 		var filterName = "hookFilterCapitalize";
 		
		return function(input) {
			
			if($filter('hookFilterInBlackListFilters')(filterName)){
				return input;
			}

			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    	}
	};
	hookFilterCapitalize.$inject = [
		'$filter'
	];
	angular.module('_Filter')
	.filter('hookFilterCapitalize', hookFilterCapitalize);

})();