(function() {
	'use strict';

	function ResourceManager(CONFIG, $q, converterService, restService, storageService) {
		var converter = converterService;
		var rest = restService;
		var storage = storageService;

		this.create = function(resource) {
			console.log('in create');
			var promise;
			var resources;
			var jsonApi = converter.toJsonApi(resource);
			//console.log(jsonApi)
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.post;
				promise = rest.post(apiUrl, jsonApi);
				promise.then(function(data) {

					resources = converter.toResourceArray(data);
					storage.insert(resources);
					resolve(storage.get(resource.type));

				}, function(reason) {

					reject(reason);

				});

			});
		};


		this.read = function(type) {

			var promise;
			var resources;

			return $q(function(resolve, reject) {

				if (storage.count(type) !== 0) {

					resolve(storage.get(type));

				} else {
					var apiUrl = CONFIG.url.api + CONFIG.models[type].api.get.all
					promise = rest.get(apiUrl);
					promise.then(function(data) {
						//console.log(data);
						resources = converter.toResourceArray(data);
						//console.log(data);
						//resolve(resources);
						storage.insert(resources);
						resolve(storage.get(type));

					}, function(reason) {

						reject(reason);

					});
				}

			});
		};

		this.readById = function(type, id) {

			var promise;
			var resources;

			return $q(function(resolve, reject) {
				if (storage.get(type)[id] && storage.get(type)[id] !== null) {

					resolve(storage.get(type)[id]);

				} else {
					var apiUrl = CONFIG.url.api + CONFIG.models[type].api.get.one.replace(':id', id);
					promise = rest.get(apiUrl);
					promise.then(function(data) {

						resources = converter.toResourceArray(data);

						//resolve(resources);
						storage.insert(resources);
						resolve(storage.get(type)[id]);

					}, function(reason) {

						reject(reason);

					});
				}

			});
		};

		this.update = function(resource) {
			console.log('in update');
			var promise;
			var jsonApi = converter.toJsonApi(resource);
			//console.log(jsonApi)
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.patch.replace(':id', resource.id);
				promise = rest.patch(apiUrl, jsonApi);
				promise.then(function(data) {

					//resources = converter.toResourceArray(data);
					console.log(resource)
					storage.update(resource);
					resolve(storage.get(resource.type)[resource.id]);

				}, function(reason) {

					reject(reason);

				});

			});
		};

		this.delete = function(resource) {
			console.log('in delete');
			var promise;
			//console.log(jsonApi)
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.delete.replace(':id', resource.id);
				promise = rest.delete(apiUrl);
				promise.then(function(data) {

					storage.delete(resource);
					//resolve(storage.get(resource.type)[resource.id]);

				}, function(reason) {

					reject(reason);

				});

			});
		};

		this.shallowCopy = function(resource){
			var obj = {};
			var attr;
			for(attr in resource){
				if(!(attr  in CONFIG.models[resource.type].relationships)){
					obj[attr] = resource[attr];
				}
			}
			return obj;
		}
		
		this.deepCopy = function(resource){
			return angular.copy(resource);
		}
	}


	function ResourceManagerProvider() {
		var converter, rest, storage;

		this.setConverter = function(converterService) {
			converter = converterService;
		};
		this.setRest = function(restService) {
			rest = restService;
		};
		this.setStorage = function(storageService) {
			storage = storageService;
		};

		var Manager = function($injector, CONFIG, $q) {
			return new ResourceManager(CONFIG, $q, $injector.get(converter), $injector.get(rest), $injector.get(storage));
		};

		this.$get = ['$injector', 'CONFIG', '$q', Manager];
	}



	angular
		.module('Manager')
		.provider('ResourceManager', ResourceManagerProvider);

})();