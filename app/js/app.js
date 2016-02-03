// Inject Modules in ArticlesApp
(function() {
	'use strict';

	angular.module('ArticlesApp', [
		'ngRoute',
		'Rest',
		'DataConverter',
		'Storage',
		'Manager',
		'Controllers',
		// dev
		'ngPrettyJson'
	]);



	// Manual Bootstrap


	var initInjector = angular.injector(['ng']);
	var $http = initInjector.get('$http');
	$http.get('http://localhost:8080/app/config/configurations.json').then(
		function(res) {
			angular.module('ArticlesApp').constant('CONFIG', res.data);

			// Manual Initialization. Ref: https://docs.angularjs.org/guide/bootstrap#manual-initialization
			// Note: Do not use ng-app directive
			angular.element(document).ready(function() {
				angular.bootstrap(document, ['ArticlesApp']);
			});
		}
	);

	// Provider configurations


	angular.module('ArticlesApp')
		.config(function(ResourceManagerProvider, CONFIG) {

			ResourceManagerProvider.setConverter(CONFIG.providers.ResourceManager.converter);
			ResourceManagerProvider.setRest(CONFIG.providers.ResourceManager.rest);
			ResourceManagerProvider.setStorage(CONFIG.providers.ResourceManager.storage);
		});
	angular.module('ArticlesApp')
		.config(['$httpProvider', function($httpProvider) {
			//Reset headers to avoid OPTIONS request (aka preflight)
			$httpProvider.defaults.headers.common = {};
			$httpProvider.defaults.headers.post = {};
			$httpProvider.defaults.headers.put = {};
			$httpProvider.defaults.headers.patch = {};
		}]);
})();