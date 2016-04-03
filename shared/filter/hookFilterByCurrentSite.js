(function() {
	'use strict';
	var hookFilterByCurrentSite = function($filter, UserInterface) {

		var filterName = "hookFilterByCurrentSite";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			var result;
			var objectId;
			var siteId;

			if (UserInterface.site != null) {
				result = [];

				for (objectId in input) {
					for (siteId in input[objectId]['sites']) {
						if (siteId == UserInterface.site.id) {
							result.push(input[objectId]);
							break;
						}
					}
				}
			} else {
				result = input;
			}

			return result;
		}
	};

	hookFilterByCurrentSite.$inject = [
		'$filter',
		'UserInterface'
	];

	angular.module('_Filter')
		.filter('hookFilterByCurrentSite', hookFilterByCurrentSite);

})();