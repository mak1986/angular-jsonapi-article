(function() {

	'use strict';

	angular.module('ArticlesApp', [
		'Rest',
		'DataConverter',
		'Resource',
		'config',
		// dev
		'ngPrettyJson'
	]);

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