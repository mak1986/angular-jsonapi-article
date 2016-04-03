(function() {
	'use strict';
	var hookFilterTitle = function($filter) {

		var filterName = "hookFilterTitle";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			var words = input.split(" ");
			var key;
			var result = [];

			for (key in words) {
				result.push($filter('hookFilterCapitalize')(words[key]));
			}
			return result.join(" ");
		}
	};

	hookFilterTitle.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterTitle', hookFilterTitle);

})();