// Inject Modules in ArticlesApp
(function() {
	'use strict';

	angular.module('ArticlesApp', [
		'ngRoute',
		'_Authentication', //Service
		'_Rest', //Service
		'_DataConverter', //Service
		'_Storage', //Service
		'_Crud', //Service
		'_Alert', //Service
		'_Ui', //Service
		'_Manager', //Provider
		'_Controllers', //Controller
		'_Filters',	//Filter
		'_UiDirectives', //Directive
	]);



	// Manual Bootstrap


	var initInjector = angular.injector(['ng']);
	var $http = initInjector.get('$http');

	$http.get('http://localhost:8080/app/config/configurations.json').then(
		function(res) {
			angular.module('ArticlesApp').constant('CONFIG', res.data);
		}
	).then(
		$http.get('http://localhost:8080/app/config/isoLangs.json').then(
			function(res){
				angular.module('ArticlesApp').constant('LANGUAGE', res.data);
			}
		).then(
			function(){
				// Manual Initialization. Ref: https://docs.angularjs.org/guide/bootstrap#manual-initialization
				// Note: Do not use ng-app directive
				angular.element(document).ready(function() {
					angular.bootstrap(document, ['ArticlesApp']);
				});
			}
		)
	);

	angular.module('ArticlesApp').constant('BASEURL', 'http://localhost:8080/app/#/');
	
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