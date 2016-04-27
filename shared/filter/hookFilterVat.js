(function() {
	'use strict';
	var hookFilterVat = function($filter) {

		var filterName = "hookFilterVat";
		var vat = 1.07;

		return function(input, option) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}
			if(option == 'exclude'){
				return Math.round(input/vat*100)/100;
			}else if(option == 'vat'){
				return Math.round((input - $filter('hookFilterVat')(input,'exclude'))*100)/100;
			}

		}
	};

	hookFilterVat.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterVat', hookFilterVat);

})();