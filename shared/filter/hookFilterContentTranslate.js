(function() {
	'use strict';

	var hookFilterContentTranslate = function($filter, UserInterface) {

		var filterName = "hookFilterContentTranslate";

		return function(input, language) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			if(input == undefined || input == ''){
				return $filter('hookFilterMachineNameTranslate')('ui.no_translation_yet');
			}else{
				if(input[language]){
					return input[language];
				}else{
					return input[UserInterface.getLanguage()];
				}
			}
		}
	};

	hookFilterContentTranslate.$inject = [
		'$filter',
		'UserInterface'
	];

	angular.module('_Filter')
		.filter('hookFilterContentTranslate', hookFilterContentTranslate);

})();