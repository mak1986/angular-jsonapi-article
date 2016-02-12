(function() {
  'use strict';
 	var translate = function($filter, ResourceManager, UiService) {
		
		var isInArray = function(value, array) {
  			return array.indexOf(value) > -1;
		}

		return function(input, filter) {
			var language = UiService.getLanguage();
			var langWithFilters = ['en'];
			var machineNames = ResourceManager.readFromStorage('machine_name');
			var machineNameId;
			var machineName;
			var machineNameTranslationId;
			var machineNameTranslation;

			var result = input;

			for(machineNameId in machineNames){
				
				machineName = machineNames[machineNameId];
				
				if(machineName.name == input){
					
					for(machineNameTranslationId in machineName.translations){
						
						machineNameTranslation = machineName.translations[machineNameTranslationId];
						if(language == machineNameTranslation.language){
					
							result = machineNameTranslation.translation;
					
						}
					
					}
				
				}
			
			}

			if(filter && isInArray(language, langWithFilters)){
				result = $filter(filter)(result);
			}

			return result;
    	}
	};

	translate.$inject = [
		'$filter',
		'ResourceManager',
		'UiService'
	];

	angular.module('_Filters')
	.filter('translate', translate);

})();