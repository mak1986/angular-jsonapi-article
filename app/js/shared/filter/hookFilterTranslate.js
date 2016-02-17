(function() {
	'use strict';
	var hookFilterTranslate = function($filter, ResourceManager, UserInterface) {

		var filterName = "hookFilterTranslate";

		var filter =  function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}
			
			var key

			if (typeof input == 'object') {

				for(key in input){
					input[key] = $filter('hookFilterTranslate')(input[key]);
				}
				return input;
			
			} else {

				var machineNames = ResourceManager.readFromStorage('machine_name');
				var machineNameId;
				var machineName;
				var machineNameTranslationId;
				var machineNameTranslation;
				var language = UserInterface.getLanguage();
				var result = input;

				for (machineNameId in machineNames) {

					machineName = machineNames[machineNameId];

					if (machineName.name == input) {

						for (machineNameTranslationId in machineName.translations) {

							machineNameTranslation = machineName.translations[machineNameTranslationId];

							if (language == machineNameTranslation.language) {

								return machineNameTranslation.translation;

							}

						}

					}

				}

				return input;
			}
		};

		filter.$stateful = true;

		return filter;
	};

	hookFilterTranslate.$inject = [
		'$filter',
		'ResourceManager',
		'UserInterface'
	];
	


	angular.module('_Filter')
		.filter('hookFilterTranslate', hookFilterTranslate);

})();