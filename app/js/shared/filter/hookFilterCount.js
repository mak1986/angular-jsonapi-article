(function() {
	'use strict';
	// has not been used yet.
	var hookFilterCount = function($filter) {

		var filterName = "hookFilterCount";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}
			console.log(input);
			return Object.keys(input).length;
		}
	};

	hookFilterCount.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterCount', hookFilterCount);

})();