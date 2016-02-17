(function() {
	'use strict';

	function UserInterface($filter, CONFIG) {

		var service = this;
		service.defaultLanguage = CONFIG.site.default_language;
		service.currentSiteId = null;
		service.user = null;

		service.setUser = function(user){
			service.user = user;
		};

		service.getLanguage = function(){
			
			if(service.user){
				var lang = $filter('hookFilterFieldValue')(service.user.preference, 'language');
			 	console.log(lang);
			 	return lang;
			}
			return service.defaultLanguage;
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
		'CONFIG'
	];

	angular
		.module('_Rest')
		.service('UserInterface', UserInterface);
})();