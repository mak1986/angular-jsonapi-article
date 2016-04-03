(function() {
  'use strict';
 	var hookFilterInBlackListFilters = function(CONFIG, UserInterface) {

		return function(input) {
			var blacklistFilters = CONFIG.languages[UserInterface.getLanguage()].blacklist_filters;
			var key;

			for(key in blacklistFilters){
				if(input == blacklistFilters[key]){
					return true;
				}
			}
			return false;
    	}
	};

	hookFilterInBlackListFilters.$inject = [
		'CONFIG',
		'UserInterface'
	];

	angular.module('_Filter')
	.filter('hookFilterInBlackListFilters', hookFilterInBlackListFilters);

})();