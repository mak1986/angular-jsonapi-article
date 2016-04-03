// Inject Modules in HookApp
(function() {
	'use strict';

	angular.module('HookApp', [
		'ngRoute',
		'ngMaterial',
		'ngMessages',
		'_Authentication', //Service
		'_Rest', //Service
		'_DataConverter', //Service
		'_Storage', //Service
		'_Crud', //Service
		'_Alert', //Service
		'_UserInterface', //Service
		'_Manager', //Provider
		'_Controllers', //Controller
		'_Filter', //Filter
		'_Directive', //Directive
	]);



	// Manual Bootstrap


	var initInjector = angular.injector(['ng']);
	var $http = initInjector.get('$http');

	$http.get('http://localhost:3000/config').then(
		function(res) {
			angular.module('HookApp').constant('CONFIG', res.data);

			// Manual Initialization. Ref: https://docs.angularjs.org/guide/bootstrap#manual-initialization
			// Note: Do not use ng-app directive
			angular.element(document).ready(function() {
				angular.bootstrap(document, ['HookApp']);
			});
		}
	)

	angular.module('HookApp').constant('BASEURL', 'http://localhost:8080/app/#/');

	// Provider configurations

	angular.module('HookApp')
		.config(function(ResourceManagerProvider, CONFIG) {

			ResourceManagerProvider.setConverter(CONFIG.providers.ResourceManager.converter);
			ResourceManagerProvider.setRest(CONFIG.providers.ResourceManager.rest);
			ResourceManagerProvider.setStorage(CONFIG.providers.ResourceManager.storage);
		});
	angular.module('HookApp')
		.config(['$httpProvider', function($httpProvider) {
			//Reset headers to avoid OPTIONS request (aka preflight)
			$httpProvider.defaults.headers.common = {};
			$httpProvider.defaults.headers.post = {};
			$httpProvider.defaults.headers.put = {};
			$httpProvider.defaults.headers.patch = {};
		}]);
})();