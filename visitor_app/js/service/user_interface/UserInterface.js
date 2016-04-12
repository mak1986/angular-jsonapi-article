(function() {
	'use strict';

	function UserInterface($filter, $route, CONFIG, ResourceManager) {

		var service = this;
		service.ready = false;
		service.currentSelectedLanguage = CONFIG.site.default_language;
		service.site = null;

		service.setSite = function(site){
			service.site = site;
		};

		service.setLanguage = function(language){
			console.log($route);
			//$route.current.params.language = language;

			service.currentSelectedLanguage = language;
			$route.updateParams({'language': language});
		};

		service.getLanguage = function(){
			return service.currentSelectedLanguage;
		};

		service.getFlagByIso2Code = function(language){
			return CONFIG.languages[language].flag;
		};

		service.setReady = function(){
			service.ready = true;
		};
		service.isReady = function(){
			return service.ready;
		}
	}

	UserInterface.$inject = [
		'$filter',
		'$route',
		'CONFIG',
		'ResourceManager'
	];

	angular
		.module('_UserInterface')
		.service('UserInterface', UserInterface);
})();