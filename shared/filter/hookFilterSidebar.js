(function() {
	'use strict';
	var hookFilterSidebar = function($filter, Authentication) {

		var filterName = "hookFilterSidebar";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}


			var key;
			var result;
			var groupId;
			var result = [];

			for (key in input) {
				for (groupId in input[key].groups) {
					if (Authentication.user.groups[groupId]) {
						result.push(input[key]);
						break;
					}
				}
			}

			return result;
		}
	};

	hookFilterSidebar.$inject = [
		'$filter',
		'Authentication'
	];

	angular.module('_Filter')
		.filter('hookFilterSidebar', hookFilterSidebar);

})();