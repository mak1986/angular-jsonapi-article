(function() {
	'use strict';

	function Resource($cacheFactory, $q, JsonApiRestReal) {

		var jsonApiRestReal = JsonApiRestReal,
			cache = $cacheFactory('resource');


		this.post = function(url, data) {
			jsonApiRestReal.post(url, data);
		};

		this.get = function(url) {
			return $q(function(resolve, reject) {

				var data = cache.get(url);
				if (data) {
					resolve(data);
				} else {

					var promise = jsonApiRestReal.get(url);

					promise.then(function(data) {
						cache.put(url, data);
						//console.log('current data', cache.get(url));
						//console.log('success', data);
						resolve(data);
					}, function(reason) {
						reject(reason);
						//$JsonApiRestExceptionHandler(new Error(reason));
					});
				}
			});
		}

		this.patch = function(url, data) {
			jsonApiRestReal.patch(url, data);
		};
		this.delete = function(url) {
			jsonApiRestReal.delete(url);
		};

	}

	Resource.$inject = [
		'$cacheFactory',
		'$q',
		'JsonApiRestReal',
		//'$JsonApiRestExceptionHandler'
	];

	angular
		.module('Resource')
		.service('Resource', Resource);

})();