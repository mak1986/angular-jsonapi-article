// Inject Modules in ArticlesApp
(function() {
	'use strict';

	angular.module('ArticlesApp', [
		'Rest',
		'DataConverter',
		'Manager',
		'config',
		// dev
		'ngPrettyJson'
	]);

})();

// Manual Bootstrap
(function() {
	'use strict';

	var initInjector = angular.injector(['ng']);
	var $http = initInjector.get('$http');
	$http.get('/app/config/models.json').then(
		function(res) {

			angular.module('config', []).constant('CONFIG', res.data);

			// Manual Initialization. Ref: https://docs.angularjs.org/guide/bootstrap#manual-initialization
			// Note: Do not use ng-app directive
			angular.element(document).ready(function() {
				angular.bootstrap(document, ['ArticlesApp']);
			});
		}
	);

})();

// Provider configurations
(function() {
	'use strict';

	angular.module('ArticlesApp')
		.config(function(ResourceManagerProvider) {
			ResourceManagerProvider.setConverter('JsonApiResourceConverter');
			ResourceManagerProvider.setRest('JsonApiRest');
		});

})();