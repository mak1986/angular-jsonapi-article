// Inject Modules in ArticlesApp
(function() {
	'use strict';

	// angular.element(document).ready(function() {
	// 	angular.bootstrap(document, ['ArticlesApp']);
	// });
	var fakeApp = angular.module('ArticlesApp', [
		'Rest',
		'DataConverter',
		'Storage',
		'Manager',
	]);

	fakeApp.constant('CONFIG', {
		"models": {
			"article": {
				"api": "http://localhost:3000/api/article?include=comments",
				"relationships": {
					"comments": "comment"
				}
			},
			"comment": {
				"api": "http://localhost:3000/api/comment",
				"relationships": {
					"article": "article"
				}
			}
		},
		"providers": {
			"ResourceManager": {
				"storage": "ResourceStorage",
				"rest": "JsonApiRest",
				"converter": "JsonApiResourceConverter"
			}
		}
	});
	// Manual Initialization. Ref: https://docs.angularjs.org/guide/bootstrap#manual-initialization
	// Note: Do not use ng-app directive

	fakeApp.config(function(ResourceManagerProvider, CONFIG) {
		//console.log(CONFIG);
		ResourceManagerProvider.setConverter(CONFIG.providers.ResourceManager.converter);
		ResourceManagerProvider.setRest(CONFIG.providers.ResourceManager.rest);
		ResourceManagerProvider.setStorage(CONFIG.providers.ResourceManager.storage);
	});


})();