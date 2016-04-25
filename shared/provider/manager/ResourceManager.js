(function() {
	'use strict';

	function ResourceManager($q, CONFIG, converterService, restService, storageService) {
		var converter = converterService;
		var rest = restService;
		var storage = storageService;

		this.create = function(resource) {
			var promise;
			var resources;
			var jsonApi = converter.toJsonApi(resource);
			// console.log('in Manager create');
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.post;
				promise = rest.post(apiUrl, jsonApi);
				promise.then(function(data) {

					resources = converter.toResourceArray(data);

					storage.insert(resources);

					resolve(storage.get(resource.type)[data.data.data.id]);

				}, function(reason) {

					reject(reason);

				});

			});
		};


		this.read = function(type) {
			var promise;
			var resources;
			//console.log('in Manager read');
			return $q(function(resolve, reject) {

				if (storage.count(type) !== 0) {

					resolve(storage.get(type));

				} else {
					var apiUrl = CONFIG.url.api + CONFIG.models[type].api.get.all
					promise = rest.get(apiUrl);
					promise.then(function(data) {

						resources = converter.toResourceArray(data);
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
			//console.log('in Manager readById');
			return $q(function(resolve, reject) {
				if (storage.get(type)[id] && storage.get(type)[id] !== null) {

					resolve(storage.get(type)[id]);

				} else {
					var apiUrl = CONFIG.url.api + CONFIG.models[type].api.get.one.replace(':id', id);
					promise = rest.get(apiUrl);
					promise.then(function(data) {

						resources = converter.toResourceArray(data);
						storage.insert(resources);
						resolve(storage.get(type)[id]);

					}, function(reason) {

						reject(reason);

					});
				}

			});
		};

		this.update = function(resource) {
			var promise;
			var jsonApi = converter.toJsonApi(resource);
			console.log('before patch',resource);
			//console.log('in Manager update');
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.patch.replace(':id', resource.id);
				promise = rest.patch(apiUrl, jsonApi);
				promise.then(function(data) {
					storage.update(resource);
					console.log('after patch', resource);
					resolve(storage.get(resource.type)[resource.id]);

				}, function(reason) {

					reject(reason);

				});

			});
		};

		this.delete = function(resource) {
			var promise;
			//console.log('in Manager delete');
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.delete.replace(':id', resource.id);
				promise = rest.delete(apiUrl);
				promise.then(function(data) {

					storage.delete(resource);
					resolve();

				}, function(reason) {

					reject(reason);

				});

			});
		};

		this.readFromStorage = function(type, id) {
			if (!id) {
				return storage.get(type);
			} else {
				return storage.get(type)[id];
			}
		}
		
		// this.deleteFromStorage = function(resource) {
		// 	return storage.delete(resource);
		// }
		
		this.shallowCopy = function(resource) {
			var obj = {};
			var attr;
			var relationshipResourceId;

			for (attr in resource) {
				if (!(attr in CONFIG.models[resource.type].relationships)) {

					if(typeof resource[attr] == 'object'){

						obj[attr] = angular.copy(resource[attr]);

					}else{
					
						obj[attr] = resource[attr];
					
					}
				
				} else {
					if (CONFIG.models[resource.type].relationships[attr].isArray) {
						for (relationshipResourceId in resource[attr]) {
							if (!obj[attr]) {
								obj[attr] = {};
							}
							obj[attr][relationshipResourceId] = true;
						}
					} else {
						for (relationshipResourceId in resource[attr]) {
							obj[attr] = {
								id: relationshipResourceId
							};
						}
					}
				}
			}

			return obj;
		}

		this.deepCopy = function(resource) {
			return angular.copy(resource);
		}

		this.readWhere = function(type, where) {
			var promise;
			var resources;

			//console.log('in Manager update');
			return $q(function(resolve, reject) {
				var apiUrl = converter.getUrlWhere(type, where);
				promise = rest.get(apiUrl);
				promise.then(function(data) {
					resources = converter.toResourceArray(data);
					resolve(resources);

				}, function(reason) {

					reject(reason);

				});

			});
		};
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

		var Manager = function($injector, $q, CONFIG) {
			return new ResourceManager($q, CONFIG, $injector.get(converter), $injector.get(rest), $injector.get(storage));
		};

		this.$get = ['$injector', '$q', 'CONFIG', Manager];
	}



	angular
		.module('_Manager')
		.provider('ResourceManager', ResourceManagerProvider);

})();