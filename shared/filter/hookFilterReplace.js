(function() {
	'use strict';
	var hookFilterReplace = function($filter) {

		var filterName = "hookFilterReplace";

		return function(input, arg1, arg2) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			if (typeof arg1 == 'object') {
				for (var key in arg1) {
					input = $filter('hookFilterReplace')(input, key, arg1[key]);
				}
				return input;
			} else {
				return input.replace(arg1, arg2);
			}
		}
	};

	hookFilterReplace.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterReplace', hookFilterReplace);

})();