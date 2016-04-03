(function() {
	'use strict';
	var hookFilterMachineNameTranslate = function($filter, ResourceManager, UserInterface) {

		var filterName = "hookFilterMachineNameTranslate";

		var filter =  function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}
			
			var key
			//console.log('in filter translate', input);
			if (typeof input == 'object') {

				for(key in input){
					input[key] = $filter('hookFilterMachineNameTranslate')(input[key]);
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

							if (language == $filter('hookFilterByFieldValue')(machineNameTranslation.language, 'iso_2_code')) {

								return machineNameTranslation.translation;

							}

						}

					}

				}
				//console.log('in filter after translate', input);

				return input;
			}
		};

		filter.$stateful = true;

		return filter;
	};

	hookFilterMachineNameTranslate.$inject = [
		'$filter',
		'ResourceManager',
		'UserInterface'
	];
	


	angular.module('_Filter')
		.filter('hookFilterMachineNameTranslate', hookFilterMachineNameTranslate);

})();