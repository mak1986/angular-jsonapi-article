(function() {
	'use strict';

	function UserInterface($filter, CONFIG, ResourceManager) {

		var service = this;
		service.defaultLanguage = CONFIG.site.default_language;
		service.currentSiteId = null;
		service.user = null;
		service.site = null;
		service.featureMode = 'plan';
		service.features = null;

		service.setUser = function(user){
			service.user = user;
		};

		service.setSite = function(site){
			service.site = site;
		};

		service.getLanguage = function(){
			
			if(service.user){
				//var lang = 'en';
				var language = $filter('hookFilterByFieldValue')(service.user.preference, 'language');
				var iso2Code = $filter('hookFilterByFieldValue')(language, 'iso_2_code');
			 	return iso2Code;
			}
			return service.defaultLanguage;
		};

		service.getEnabledLanguages = function(){
			if(service.site){
				return service.site.enabledLanguages;
			}
			return ResourceManager.readFromStorage('language');
		};

		service.getFlagByIso2Code = function(language){
			return CONFIG.languages[language].flag;
		};

		service.setCurrentSiteId = function(id){
			service.currentSiteId = id;
		};
		
		service.getCurrentSiteId = function(id){
			return service.currentSiteId;
		};

		service.hasFeature = function(machineName){
			var id;

			for(id in service.features){
				if($filter('hookFilterByFieldValue')(service.features[id].machineName, 'name') == machineName){
					return true;
				}
			}
			return false;
		};
	}

	UserInterface.$inject = [
		'$filter',
		'CONFIG',
		'ResourceManager'
	];

	angular
		.module('_UserInterface')
		.service('UserInterface', UserInterface);
})();