(function() {
	'use strict';
	var hookFilterBySiteId = function($filter, UserInterface) {

		var filterName = "hookFilterBySiteId";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			var result;
			var objectId;
			var siteId;

			if (UserInterface.currentSiteId != null) {
				result = [];

				for (objectId in input) {
					for (siteId in input[objectId]['sites']) {
						if (siteId == UserInterface.getCurrentSiteId()) {
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

	hookFilterBySiteId.$inject = [
		'$filter',
		'UserInterface'
	];

	angular.module('_Filter')
		.filter('hookFilterBySiteId', hookFilterBySiteId);

})();