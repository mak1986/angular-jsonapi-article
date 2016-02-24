(function() {
	'use strict';

	function UserInterface($filter, CONFIG, ResourceManager) {

		var service = this;
		service.defaultLanguage = CONFIG.site.default_language;
		service.currentSiteId = null;
		service.user = null;
		service.site = null;

		service.setUser = function(user){
			service.user = user;
		};

		service.setSite = function(site){
			service.site = site;
		};

		service.getLanguage = function(){
			
			if(service.user){
				var lang = 'en';
				//var lang = $filter('hookFilterByFieldValue')(service.user.preference, 'language');
			 	return lang;
			}
			return service.defaultLanguage;
		};

		service.getEnableLanguages = function(){
			if(service.site){
				return service.site.enableLanguages;
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
	}

	UserInterface.$inject = [
		'$filter',
		'CONFIG',
		'ResourceManager'
	];

	angular
		.module('_Rest')
		.service('UserInterface', UserInterface);
})();