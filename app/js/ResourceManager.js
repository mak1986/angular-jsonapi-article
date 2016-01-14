// (function() {
// 	'use strict';

// 	function ResourceManager($cacheFactory, $q, CONFIG, JsonApiRest, JsonApiResourceConverter) {

// 		var jsonApiRest = JsonApiRest,
// 			cache = $cacheFactory('resource'),
// 			converter = JsonApiResourceConverter;

// 		this.post = function(url, data) {
// 			jsonApiRest.post(url, data);
// 		};

// 		this.get = function(type) {
// 			var apiUrl = this.getApiUrl(type);
// 			//console.log(apiUrl);
// 			return $q(function(resolve, reject) {

// 				var data = cache.get(apiUrl);
// 				if (data) {
// 					resolve(data);
// 				} else {

// 					var promise = jsonApiRest.get(apiUrl);

// 					promise.then(function(data) {
// 						cache.put(apiUrl, data);
// 						//console.log('current data', cache.get(url));
// 						//console.log('success', data);
// 						resolve(data);
// 					}, function(reason) {
// 						reject(reason);
// 						//$JsonApiRestExceptionHandler(new Error(reason));
// 					});
// 				}
// 			});
// 		};

// 		this.patch = function(url, data) {
// 			jsonApiRest.patch(url, data);
// 		};
// 		this.delete = function(url) {
// 			jsonApiRest.delete(url);
// 		};

// 		this.getApiUrl = function(type){
// 			//console.log(type);
// 			for (var key in CONFIG){
// 				if (key == type){
// 					return CONFIG[key].api;
// 				}
// 			}
// 		};

// 	}

// 	ResourceManager.$inject = [
// 		'$cacheFactory',
// 		'$q',
// 		'CONFIG',
// 		'JsonApiRest',
// 		'JsonApiResourceConverter'
// 		//'$JsonApiRestExceptionHandler'
// 	];

// 	angular
// 		.module('Resource')
// 		.service('ResourceManager', ResourceManager);

// })();