(function() {
	'use strict';

	function UiService(CONFIG) {

		var service = this;
		service.language = CONFIG.site.default_language;

		service.setLanguage = function(language){
			service.language = language;
		}

		service.getLanguage = function(){
			return service.language;
		}

	}

	UiService.$inject = [
		'CONFIG'
	];

	angular
		.module('_Rest')
		.service('UiService', UiService);
})();